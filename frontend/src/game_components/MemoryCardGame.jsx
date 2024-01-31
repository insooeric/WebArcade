/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import MemoryGameResult from "../components/MemoryGameResult";
import { useCreateUserRecordMutation } from "../slices/recordsApiSlice";
import $ from "jquery";
import mokoko_img from "../img/mokoko/mokoko.png";
import mokoko_img1 from "../img/mokoko/mokoko1.jpg";
import mokoko_img2 from "../img/mokoko/mokoko2.jpg";
import mokoko_img3 from "../img/mokoko/mokoko3.jpg";
import mokoko_img4 from "../img/mokoko/mokoko4.jpg";
import mokoko_img5 from "../img/mokoko/mokoko5.png";
import mokoko_img6 from "../img/mokoko/mokoko6.jpg";
import mokoko_img7 from "../img/mokoko/mokoko7.jpg";
import mokoko_img8 from "../img/mokoko/mokoko8.png";
import mokoko_img9 from "../img/mokoko/mokoko9.png";
import mokoko_img10 from "../img/mokoko/mokoko10.jpg";
import mokoko_img11 from "../img/mokoko/mokoko11.jpeg";
import mokoko_img12 from "../img/mokoko/mokoko12.png";

const MemoryCardGame = () => {
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const [updateRecord] = useCreateUserRecordMutation();

  let state = "stop";
  const startGame = () => {
    var Memory = {
      init: function (cards) {
        this.$game = $(".game");
        this.$modal = $(".modal");
        this.$resultModel = $(".result");
        this.$restartButton = $("button.restart");
        this.cardsArray = $.merge(cards, cards);
        this.shuffleCards(this.cardsArray);
        this.setup();
      },

      shuffleCards: function (cardsArray) {
        this.$cards = $(this.shuffle(cardsArray));
      },

      setup: function () {
        state = "stop";
        this.html = this.buildHTML();
        this.$game.html(this.html);
        this.$memoryCards = $(".card");
        this.paused = false;
        this.guess = null;
        this.binding();
      },

      binding: function () {
        this.$memoryCards.on("click", this.cardClicked);
        this.$restartButton.on("click", $.proxy(this.reset, this));
      },
      cardClicked: function () {
        var _ = Memory;
        if (state === "stop") {
          state = "start";
          startTimer();
        }
        var $card = $(this);
        if (
          !_.paused &&
          !$card.find(".inside").hasClass("matched") &&
          !$card.find(".inside").hasClass("picked")
        ) {
          $card.find(".inside").addClass("picked");
          if (!_.guess) {
            _.guess = $(this).attr("data-id");
          } else if (
            _.guess == $(this).attr("data-id") &&
            !$(this).hasClass("picked")
          ) {
            $(".picked").addClass("matched");
            _.guess = null;
          } else {
            _.guess = null;
            _.paused = true;
            setTimeout(function () {
              $(".picked").removeClass("picked");
              Memory.paused = false;
            }, 600);
          }
          if ($(".matched").length == $(".card").length) {
            _.win();
          }
        }
      },

      win: function () {
        this.paused = true;
        stopTimer();
        saveData(sessionStorage.getItem("MemoryGame"));
        setTimeout(function () {
          Memory.$game.fadeOut();
        }, 500);
        setTimeout(function () {
          Memory.showModal();
        }, 1000);
      },

      showModal: function () {
        this.$resultModel.show();
        this.$modal.fadeIn("slow");
      },

      hideModal: function () {
        this.$resultModel.hide();
        this.$modal.hide();
      },

      reset: function () {
        resetTimer();
        state = stop;
        this.hideModal();
        this.shuffleCards(this.cardsArray);
        this.setup();
        this.$game.show("slow");
      },

      shuffle: function (array) {
        var counter = array.length,
          temp,
          index;
        while (counter > 0) {
          index = Math.floor(Math.random() * counter);
          counter--;
          temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
        }
        return array;
      },

      buildHTML: function () {
        var frag = "";
        this.$cards.each(function (k, v) {
          frag += '<div class="card" data-id="' + v.id + '">';
          frag += '<div class="inside">';
          frag += '<div class="front">';
          frag += '<img src="' + v.img + '" alt="' + v.name + '"/>';
          frag += "</div>";
          frag += '<div class="back">';
          frag += '<img src="' + mokoko_img + '" alt="back image"/>';
          frag += "</div>";
          frag += "</div>";
          frag += "</div>";
        });
        return frag;
      },
    };

    var cards = [
      {
        name: "mokoko1",
        img: mokoko_img1,
        id: 1,
      },
      {
        name: "mokoko2",
        img: mokoko_img2,
        id: 2,
      },
      {
        name: "mokoko3",
        img: mokoko_img3,
        id: 3,
      },
      {
        name: "mokoko4",
        img: mokoko_img4,
        id: 4,
      },
      {
        name: "mokoko5",
        img: mokoko_img5,
        id: 5,
      },
      {
        name: "mokoko6",
        img: mokoko_img6,
        id: 6,
      },
      {
        name: "mokoko7",
        img: mokoko_img7,
        id: 7,
      },
      {
        name: "mokoko8",
        img: mokoko_img8,
        id: 8,
      },
      {
        name: "mokoko9",
        img: mokoko_img9,
        id: 9,
      },
      {
        name: "mokoko10",
        img: mokoko_img10,
        id: 10,
      },
      {
        name: "mokoko11",
        img: mokoko_img11,
        id: 11,
      },
      {
        name: "mokoko12",
        img: mokoko_img12,
        id: 12,
      },
    ];

    Memory.init(cards);
  };

  const startTimer = () => {
    // Update the timer every second
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 0.01);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current); // Use timerRef.current to clear the interval
  };

  const resetTimer = () => {
    setTimer(0); // Reset the timer state
  };

  const saveData = async (timerValue) => {
    try {
      const res = await updateRecord({
        gameId: "memoryGame",
        score: timerValue,
      });
    } catch (err) {
      console.log("Something went wrong :(");
    }
  };

  useEffect(() => {
    startGame();

    return () => {
      sessionStorage.removeItem("MemoryGame");
      clearInterval(timerRef.current); // Cleanup the interval on component unmount
    };
  }, []);
  return (
    <>
      <div className="memory-card">
        <div className="game"></div>
        <div className="result">
          <MemoryGameResult timer={timer} />
        </div>
      </div>
    </>
  );
};

export default MemoryCardGame;
