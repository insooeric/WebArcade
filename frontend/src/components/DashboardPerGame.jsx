/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import {
  useGetUserRecordMutation,
  useGetGameRecordMutation,
} from "../slices/recordsApiSlice.js";
import { toast } from "react-toastify";
import { scoreFormatter } from "../utils/scoreFormatter.js";
import { dateFormatter } from "../utils/dateFormatter.js";
import { useSelector } from "react-redux";
import LoginAlert from "./LoginAlert.jsx";
import trophyImg from "../img/trophy.gif";
import averageImg from "../img/average.gif";
import notExistImg from "../img/not-found.gif";

const DashboardPerGame = ({ gameId }) => {
  const [getUserRecord] = useGetUserRecordMutation();
  const [getAllGameRecord] = useGetGameRecordMutation();
  const [userAverageScore, setUserAverageScore] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);

  var scoreGap = useRef(0);
  var scoresRef = useRef([]);
  var percentageRef = useRef(101);
  var userHighestScoreRef = useRef(0);
  var userClearDateRef = useRef("");
  // var userAverageScoreRef = useRef(0);

  const getAccordingGameRecord = async (gameId) => {
    try {
      const res = await getAllGameRecord({
        gameId,
      }).then((data) => {
        var gameRank = data.data.records;
        scoresRef.current = gameRank.map((entry) => entry.highestScore);
        createHistogram(scoresRef.current);
        getUserRecordForGame(gameId);
      });
    } catch (err) {
      toast.error("Something went wrong :(");
      console.log(err);
    }
  };

  const getUserRecordForGame = async (gameId) => {
    try {
      const res = await getUserRecord({
        gameId,
      }).then((data) => {
        userHighestScoreRef.current = data.data.highestScore;
        userClearDateRef.current = data.data.clearDate;
        setUserAverageScore(data.data.averageScore.toFixed(0));
        if (userHighestScoreRef.current != 0) {
          percentageRef.current = getUserPercentage(
            scoresRef.current,
            userHighestScoreRef.current
          );
        }
        const circleGraph = document.getElementById("progress-bar");
        circleGraph.style.setProperty(
          "--percentage",
          `${percentageRef.current}%`
        );
      });
    } catch (err) {
      toast.error("Something went wrong :(");
    }
  };

  const getUserPercentage = (scores, score) => {
    // var newScores = [...new Set(scores)];
    var newScores = scores;
    var ranking = 1;
    newScores.some((s) => {
      if (s == score) {
        return true;
      }
      ranking++;
    });

    return ((ranking / newScores.length) * 100).toFixed(2);
  };

  const createHistogram = (scores) => {
    try {
      let histogramValues = new Array(20).fill(0);
      scoreGap.current =
        (scores[0] - scores[scores.length - 1]) / (histogramValues.length - 1);
      var minScore = scores[scores.length - 1] - scoreGap.current;
      var maxScore = scores[scores.length - 1];
      var count = 0;
      var scoreList = new Array(20).fill(0);
      histogramValues.forEach((key, index) => {
        scoreList[index] = maxScore.toFixed(0);
        minScore += scoreGap.current;
        maxScore += scoreGap.current;
        count = 0;
        scores.forEach((score) => {
          switch (gameId) {
            case "memoryGame":
              if (score <= minScore && score > maxScore) {
                count++;
              }
              break;
            case "towerGame":
            case "simonGame":
            case "clickGame":
            case "typeGame":
            case "jumpGame":
              if (score >= minScore && score < maxScore) {
                count++;
              }
              break;
          }
        });
        histogramValues[index] = count;
      });
      const maxValue = Math.max(...histogramValues);
      var index = -1;
      const histogram = histogramValues.reduce((acc, number) => {
        const height = (number / maxValue) * 50;
        index++;
        return (
          acc +
          `<div class="histogram-outer-layout">
          <span>${scoreList[index]}</span>
          <div class="histogramItem" style="height: calc(${height}% + 1px);"></div></div>`
        );
      }, ``);
      // inject into dom
      const chartEl = document.getElementById("chart");
      chartEl.innerHTML = histogram;
    } catch (err) {
      toast.error("Something went wrong :(");
    }
  };

  useEffect(() => {
    if (userInfo) {
      getAccordingGameRecord(gameId);
    }
  }, []);
  return (
    <>
      <div className="dashboard-per-game">
        {userInfo ? (
          <>
            <div className="container userHighestScore">
              <div className="title">Highest Score</div>
              <div className="content">
                <div className="inner-shadow">
                  <div className="icon">
                    <img src={trophyImg} />
                  </div>
                </div>
                <div className="score">
                  {scoreFormatter(gameId, userHighestScoreRef.current)}
                </div>
                <div className="date">
                  Acheived in: <br />
                  {dateFormatter(userClearDateRef.current)}
                </div>
              </div>
            </div>
            <div className="container userAvgScore">
              <div className="title">Average Score</div>
              <div className="content">
                <div className="inner-shadow">
                  <div className="icon">
                    <img src={averageImg} />
                  </div>
                </div>

                <div className="score">
                  {scoreFormatter(gameId, userAverageScore)}
                </div>
              </div>
            </div>
            <div className="container gameGlobalHistogram">
              <div className="title">Population</div>
              <div className="mobile-percentage">
                <div className="first-title">You are</div>
                <div className="second-title">TOP</div>
                <div className="percentage">
                  {percentageRef.current > 100 ? (
                    <img src={notExistImg} />
                  ) : (
                    <>{percentageRef.current}%</>
                  )}
                </div>
              </div>
              <div id="histogramWrapper">
                <div id="chart" className="addedStyles">
                  {/* yeet */}
                </div>
                <div className="rating">
                  <div id="progress-bar">
                    {percentageRef.current <= 100 ? (
                      <div className="percentage-text">{`${percentageRef.current}%`}</div>
                    ) : (
                      <img src={notExistImg} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <LoginAlert />
        )}
      </div>
    </>
  );
};

export default DashboardPerGame;
