// import { useEffect, useState } from "react";
// import { useGetGameRecordMutation } from "../slices/recordsApiSlice.js";
// import { toast } from "react-toastify";
import gameList from "../components/gameList.js";
import RankingCardView from "../components/RankingCardView.jsx";

const LeaderBoardPage = () => {
  return (
    <>
      <div className="leader-board-page">
        {gameList.map((gameInfo) => (
          <RankingCardView key={gameInfo.id} gameInfo={gameInfo} />
        ))}
      </div>
    </>
  );
};

export default LeaderBoardPage;
