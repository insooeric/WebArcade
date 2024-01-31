/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import wordList from "../components/WordList";
import { useCreateUserRecordMutation } from "../slices/recordsApiSlice";

const TypingGame = () => {
  const [updateRecord] = useCreateUserRecordMutation();
  var score = useRef(0);

  const saveData = async (gameScore) => {
    try {
      const res = await updateRecord({
        gameId: "typeGame",
        score: gameScore,
      });
    } catch (err) {
      console.log("Something went wrong :(");
    }
  };
  useEffect(() => {
    var temp = document.querySelector(".time");
    var button = document.querySelector("button");
    var words = document.querySelector(".words");
    var timerDiv = document.querySelector(".time");
    var scoreDiv = document.querySelector(".score");
    var points = 0;
    var spans;
    var typed;
    var seconds = 60;

    function countdown() {
      points = 0;
      var timer = setInterval(function () {
        button.disabled = true;
        seconds--;
        temp.innerHTML = seconds;
        if (seconds === 0) {
          score.current = points;
          saveData(score.current);
          scoreDiv.innerHTML = "0";
          words.innerHTML = "";
          button.disabled = false;
          clearInterval(timer);
          seconds = 60;
          timerDiv.innerHTML = "60";
          button.disabled = false;
        }
      }, 1000);
    }

    function random() {
      words.innerHTML = "";
      var random = Math.floor(Math.random() * (1943 - 0 + 1)) + 0;
      var wordArray = wordList[random].split("");
      for (var i = 0; i < wordArray.length; i++) {
        var span = document.createElement("span");
        span.classList.add("span");
        span.innerHTML = wordArray[i];
        words.appendChild(span);
      }
      spans = document.querySelectorAll(".span");
    }

    button.addEventListener("click", function (e) {
      countdown();
      random();
      button.disabled = true;
    });

    function typing(e) {
      typed = String.fromCharCode(e.which);
      if (!spans) {
        return;
      }
      for (var i = 0; i < spans.length; i++) {
        if (spans[i].innerHTML === typed) {
          // if typed letter is the one from the word
          if (spans[i].classList.contains("bg")) {
            // if it already has class with the bacground color then check the next one
            continue;
          } else if (
            (spans[i].classList.contains("bg") === false &&
              spans[i - 1] === undefined) ||
            spans[i - 1].classList.contains("bg") !== false
          ) {
            // if it dont have class, if it is not first letter or if the letter before it dont have class (this is done to avoid marking the letters who are not in order for being checked, for example if you have two "A"s so to avoid marking both of them if the first one is at the index 0 and second at index 5 for example)
            spans[i].classList.add("bg");
            break;
          }
        }
      }
      var checker = 0;
      for (var j = 0; j < spans.length; j++) {
        //checking if all the letters are typed
        if (spans[j].className === "span bg") {
          checker++;
        }
        if (checker === spans.length) {
          // if so, animate the words with animate.css class
          // spark.pause();
          // spark.currentTime = 0;
          // spark.play();
          words.classList.add("animated");
          words.classList.add("fadeOut");
          points++; // increment the points
          scoreDiv.innerHTML = points; //add points to the points div
          document.removeEventListener("keydown", typing, false);
          setTimeout(function () {
            words.className = "words"; // restart the classes
            random(); // give another word
            document.addEventListener("keydown", typing, false);
          }, 100);
        }
      }
    }

    document.addEventListener("keydown", typing, false);
  }, []);
  return (
    <>
      <div className="typing-game">
        <div className="wrapper">
          <h1>Typing game</h1>
          <h6>Available in PC</h6>
          <p>Type as many words as you can until time runs out!</p>
          <button>START</button>
          <div className="outerWrap">
            <div className="scoreWrap">
              <p>Score</p>
              <span className="score">0</span>
            </div>
            <div className="timeWrap">
              <p>Time left</p>
              <span className="time">60</span>
            </div>
          </div>
          <div className="wordsWrap">
            <p className="words"></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TypingGame;
