import { useEffect, useState } from "react";
import { useGetGameRecordTop10Mutation } from "../slices/recordsApiSlice.js";
import { toast } from "react-toastify";
import { scoreFormatter } from "../utils/scoreFormatter.js";
import { dateFormatter } from "../utils/dateFormatter.js";
import Loader from "../components/Loader";

const RankingCardView = ({ gameInfo }) => {
  const [getGameRecord, { isLoading }] = useGetGameRecordTop10Mutation();
  const [gameRank, setGameRank] = useState([]);

  const getAccordingGameRecord = async (gameId) => {
    try {
      const res = await getGameRecord({
        gameId,
      });
      setGameRank(res.data.records);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    getAccordingGameRecord(gameInfo.gameId);
  }, [gameInfo.gameId]);

  return (
    <>
      <div className="ranking-card-view">
        <h1>{gameInfo.title}</h1>
        {isLoading && <Loader />}
        <ol>
          {gameRank && gameRank.length > 0 ? (
            gameRank.map((rank, index) => (
              <li key={index}>
                <mark>{rank.userName}</mark>
                <small>
                  <span className="clear-date">
                    Date: {dateFormatter(rank.clearDate)}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  {scoreFormatter(gameInfo.gameId, rank.highestScore)}
                </small>
              </li>
            ))
          ) : (
            <li>No data available</li>
          )}
        </ol>
      </div>
    </>
  );
};

export default RankingCardView;
