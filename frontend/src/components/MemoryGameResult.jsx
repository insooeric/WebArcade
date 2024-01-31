const MemoryGameResult = ({ timer }) => {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = (timeInSeconds % 60).toFixed(2);

    return `${String(minutes).padStart(2, "0")}:${seconds}`;
  };
  return (
    <>
      <div className="memory-game-result">
        <div id="container">
          <div id="success-box">
            <div className="score">{formatTime(timer)}</div>
            {sessionStorage.setItem("MemoryGame", timer)}
            <div className="shadow scale"></div>
            <div className="message">
              <h1 className="alert">Success!</h1>
              <p>Try again for better score?</p>
            </div>
            <button className="restart">
              <h1 className="green">RESTART</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemoryGameResult;
