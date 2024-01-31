import { Link } from "react-router-dom";

const GameCardView = ({ gameInfo }) => {
  return (
    <>
      <div className="game-card-view">
        <div className={`card ${gameInfo.gameId + "Bg"}`}>
          <div className="content">
            <h2 className="title">{gameInfo.title}</h2>
            <p className="desc"></p>
            <Link className="btn" to={`/game-page/${gameInfo.route}`}>
              Play
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCardView;
