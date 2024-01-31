import TowerStackGame from "../game_components/TowerStackGame";
import MemoryCardGame from "../game_components/MemoryCardGame";
import SimonGame from "../game_components/SimonGame";
import ClickGame from "../game_components/ClickGame";
import TypingGame from "../game_components/TypingGame";
import FlappyBird from "../game_components/FlappyBird";
import ComingSoon from "../components/ComingSoon";

import DashboardPerGame from "../components/DashboardPerGame";

import { useParams } from "react-router-dom";
import { useEffect } from "react";

const GamePage = () => {
  const { gameRoute } = useParams();
  var gameId = "";
  const renderGameComponent = () => {
    switch (gameRoute) {
      case "tower-stack":
        gameId = "towerGame";
        return <TowerStackGame />;
      case "memory-game":
        gameId = "memoryGame";
        return <MemoryCardGame />;
      case "simon-game":
        gameId = "simonGame";
        return <SimonGame />;
      case "click-game":
        gameId = "clickGame";
        return <ClickGame />;
      case "word-type":
        gameId = "typeGame";
        return <TypingGame />;
      case "flappy-bird":
        gameId = "jumpGame";
        return <FlappyBird />;
      case "game7_route":
        gameId = "none";
        return <ComingSoon />;
      case "game8_route":
        gameId = "none";
        return <ComingSoon />;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", function (e) {
      if (e.key == " " && e.target == document.body) {
        e.preventDefault();
      }
    });
  }, []);
  return (
    <>
      <div className="game-page">
        <div className="viewer">{renderGameComponent()}</div>
        <br />
        <DashboardPerGame gameId={gameId} />
      </div>
    </>
  );
};

export default GamePage;
