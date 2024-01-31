/* eslint-disable no-unused-vars */
// import { useEffect } from "react";
import GameCardView from "../components/GameCardView";
import gameList from "../components/gameList";
import { useEffect } from "react";

const GameListPage = () => {
  return (
    <>
      <div className="game-list-content">
        {gameList.map((gameInfo) => (
          <GameCardView key={gameInfo.id} gameInfo={gameInfo} />
        ))}
      </div>
    </>
  );
};

export default GameListPage;
