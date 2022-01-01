import GameBoard from "../Components/GameBoard";
import Timer from "../Components/Timer";
import Score from "../Components/Score";

function PlayGame(props) {
  const saveScore = (scoreOnGameStop) => {
    console.log(`you got ${scoreOnGameStop} points.`);
  };

  const stopGame = () => {
    console.log("GAME WAS STOPPED");
  };

  return (
    <div className="GamePage">
      <GameBoard />
      <Score saveScore={saveScore} />
      <Timer stopGame={stopGame} />
      <button>New Game</button>
    </div>
  );
}

export default PlayGame;
