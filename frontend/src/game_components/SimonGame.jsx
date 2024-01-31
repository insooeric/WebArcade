/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import $ from "jquery";
import { useCreateUserRecordMutation } from "../slices/recordsApiSlice";

const SimonGame = () => {
  const [updateRecord] = useCreateUserRecordMutation();
  const saveData = async (score) => {
    try {
      const res = await updateRecord({ gameId: "simonGame", score });
    } catch (err) {
      console.log("Something went wrong :(");
    }
  };
  useEffect(() => {
    var arr = [];
    var userArr = [];
    var computerArr = [];
    var steps = 1;
    var tileIds = [1, 2, 3, 4];
    var interval;
    var counter = 0;
    var random;
    var kount = 0;
    var mode = 0;
    var score = 0;
    function endGame() {
      clearInterval(interval);
      deactivate();
      $(".game-status").html("Game Over!");
      $(".final-score").removeClass("hidden");
      $(".final-score").html(`Score: ${score}`);
      saveData(score);
      $(".game-controls").addClass("hidden");
      $(".btn-start").removeClass("hidden");
      arr = [];
      userArr = [];
      computerArr = [];
      steps = 1;
      counter = 0;
      kount = 0;
      mode = 0;
      score = 0;
    }

    function deactivate() {
      $("#tile-" + random).removeClass("tile-" + random + "-activated");
      $(".btn-reset").prop("disabled", false);
    }

    function activate() {
      $("#tile-" + random).addClass("tile-" + random + "-activated");
    }

    function triggerClick() {
      $("#tile-" + random).trigger("click", function (e) {});
    }

    function setMode() {
      mode = 1;
      $(".game-status").html("Your Turn");
    }

    function timeout() {
      // if (steps > 20) {
      //   alert("Victory! Congratulations");
      // }
      $(".btn-reset").prop("disabled", "disabled");
      $(".game-status").html("Computer's Turn");
      $(".game-steps-no").html(steps);
      $(".game-score-no").html(score);
      mode = 0;
      arr = computerArr;
      computerArr = [];
      userArr = [];

      interval = setInterval(function () {
        kount = 0;
        deactivate();
        random = Math.floor(Math.random() * tileIds.length);
        if (arr[counter] !== undefined) {
          random = arr[counter];
        }
        setTimeout(triggerClick, 500);
        setTimeout(activate, 500);
        counter++;

        if (counter == steps) {
          clearInterval(interval);
          setTimeout(deactivate, 750);
          kount = 0;
          setTimeout(setMode, 1000);
        }
      }, 750);
    }

    $(".tile").on("click", function (e) {
      var idNum = e.currentTarget.id.substr(5);
      function playAudio() {
        var audio = document.getElementById("sound-" + idNum);
        audio.play();
      }
      playAudio();
      if (e.isTrigger) {
        computerArr.push(idNum);
      } else if (mode == 1) {
        userArr.push(idNum);
        if (computerArr[kount] !== userArr[kount]) {
          endGame();
        }
        kount++;
        if (kount == computerArr.length) {
          mode = 0;
          counter = 0;
          steps++;
          score++;
          setTimeout(timeout, 400);
          $(".game-score-no").html(score);
        }
      }
    });

    $(".btn-start").on("click", function () {
      $(this).addClass("hidden");

      $(".final-score").addClass(`hidden`);
      $(".game-controls").removeClass("hidden");
      timeout();
    });

    $(".btn-reset").on("click", function () {
      setTimeout(endGame, 100);
    });

    return () => {
      // Clear any ongoing interval when the component is unmounted
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <div className="simon-game">
        <div className="main">
          <div className="container">
            <div className="status">
              <h1 className="game-status">Simon Game</h1>
              <p className="final-score hidden">Score: </p>
            </div>

            <div className="tiles">
              <div className="row top-row">
                <div className="tile tile-1 u-pull-left" id="tile-1"></div>
                <div className="tile tile-2 u-pull-right" id="tile-2"></div>
              </div>

              <div className="row bottom-row">
                <div className="tile tile-3 u-pull-left" id="tile-3"></div>
                <div className="tile tile-4 u-pull-right" id="tile-4"></div>
              </div>
            </div>

            <div className="controls">
              <button className="btn btn-start">Start Game</button>
              <div className="game-controls hidden">
                <button className="btn btn-reset">Reset Game</button>
                <div className="game-score u-pull-right">
                  <div className="game-score-no">0</div>
                  <span className="game-score-text">Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden">
          <audio
            src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
            id="sound-1"
          ></audio>
          <audio
            src="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
            id="sound-2"
          ></audio>
          <audio
            src="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
            id="sound-3"
          ></audio>
          <audio
            src="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
            id="sound-4"
          ></audio>
        </div>
      </div>
    </>
  );
};

export default SimonGame;
