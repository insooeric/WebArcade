const scoreFormatter = (gameId, score) => {
  let result = "";
  let minutes = 0;
  let seconds = 0;
  switch (gameId) {
    case "towerGame":
      result = `${score} blocks`;
      break;
    case "memoryGame":
      minutes = Math.floor(score / 60);
      seconds = (score % 60).toFixed(2);
      result = `${String(minutes).padStart(2, "00")}:${String(seconds).padStart(
        5,
        "00"
      )}`;
      break;
    case "simonGame":
      result = `${score} Steps`;
      break;
    case "clickGame":
      result = `Level ${score} `;
      break;
    case "typeGame":
      result = `${score} Words`;
      break;
    case "jumpGame":
      result = `Level ${score}`;
      break;
    default:
      result = "none";
  }
  return result;
};

export { scoreFormatter };
