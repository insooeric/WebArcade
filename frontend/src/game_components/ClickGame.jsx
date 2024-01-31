/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useCreateUserRecordMutation } from "../slices/recordsApiSlice";

const ClickGame = () => {
  const [updateRecord] = useCreateUserRecordMutation();
  useEffect(() => {
    var grid = 3;
    var level = 1;
    var delay = 1000;
    var pd = 40;
    var timer, trans_timer;
    var is_over = false;
    var random;

    var $bc = qs(".board_content");
    var $btn_start = qs(".btn-start");
    var $btn_restart = qs(".btn-restart");
    var $start_screen = qs(".start-screen");
    var $gameover_screen = qs(".gameover-screen");
    var $level = qs("h2 span");
    var $gamezone = qs(".gamezone");
    var $squares = qs(".squares");
    var $squares_tr = $squares.children;
    var $target = c("span");

    initGame();

    function calcGameSize() {
      var size =
        $bc.offsetWidth < $bc.offsetHeight
          ? $bc.offsetWidth - pd
          : $bc.offsetHeight - pd;
      $squares.style.width = size + "px";
      $squares.style.height = size + "px";
    }

    function initGame() {
      window.addEventListener("resize", calcGameSize);

      $btn_start.addEventListener("click", function () {
        $start_screen.classList.remove("is-open");
        generateGrid(grid);
        $gamezone.classList.add("is-open");
        throwTarget();
      });

      $btn_restart.addEventListener("click", function () {
        grid = 3;
        level = 1;
        is_over = false;

        while ($squares.lastChild) {
          $squares.removeChild($squares.lastChild);
        }

        $gameover_screen.classList.remove("is-open");
        generateGrid(grid);
        $gamezone.classList.add("is-open");
        throwTarget();
      });

      calcGameSize();
    }

    function generateGrid(nb) {
      var tr, td;

      for (var i = 0; i < nb; i++) {
        if ($squares_tr[i]) {
          td = createSquare();
          $squares_tr[i].appendChild(td);
        } else {
          tr = c("tr");

          for (var a = 0; a < nb; a++) {
            td = createSquare();
            tr.appendChild(td);
          }

          $squares.appendChild(tr);
        }
      }
    }

    function createSquare() {
      var square = c("td");

      square.addEventListener("mousedown", function () {
        checkVictoryOrFail(this);
      });

      return square;
    }

    function checkVictoryOrFail(el) {
      clearTimeout(timer);
      clearTimeout(trans_timer);
      var $clone = $target.cloneNode(true);
      $target.parentNode.replaceChild($clone, $target);
      $target = $clone;

      if (is_over) {
        return;
      }

      if (el.children[0] === $target) {
        grid++;
        level++;
        $level.textContent = level;
        generateGrid(grid);
        throwTarget();
      } else {
        is_over = true;
        saveData(level);
        $gameover_screen.classList.add("is-open");
        $gamezone.classList.remove("is-open");
      }
    }

    function throwTarget() {
      var new_random;

      do {
        new_random = Math.floor(Math.random() * grid * grid);
      } while (random === new_random);

      random = new_random;

      var line = Math.floor(random / grid);
      var col = random % grid;

      $target.classList.add("is-hidden");
      $squares_tr[line].children[col].appendChild($target);

      $target.addEventListener("transitionend", onEnd);
      // force reflow
      $target.offsetWidth;
      $target.classList.remove("is-hidden");

      function onEnd() {
        $target.removeEventListener("transitionend", onEnd);
        timer = setTimeout(function () {
          throwTarget();
        }, delay);
      }
    }

    function qs(slct) {
      return document.querySelector(slct);
    }

    function c(name) {
      return document.createElement(name);
    }
  }, []);

  const saveData = async (scoreValue) => {
    try {
      const res = await updateRecord({
        gameId: "clickGame",
        score: scoreValue,
      });
    } catch (err) {
      console.log("Something went wrong :(");
    }
  };
  return (
    <>
      <div className="click-game">
        <div className="board">
          <header className="board_header">
            <h1>
              F<small>ast</small>C<small>lick</small>G<small>ame</small>
            </h1>

            <h2>
              Level <span>1</span>
            </h2>
          </header>

          <div className="board_content">
            <div className="start-screen screen is-open">
              <h3>Ready ?</h3>
              <button className="btn-start">Start</button>
            </div>

            <div className="gameover-screen screen">
              <h3>Game Over</h3>
              <button className="btn-restart">Restart?</button>
            </div>

            <div className="gamezone">
              <table className="squares"></table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClickGame;
