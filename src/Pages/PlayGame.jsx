import GameBoard from "../Components/GameBoard";
import GameControls from "../Components/GameControls";

function Game(props) {
  return (
    <div className="GamePage">
      <GameBoard />
      <GameControls />
    </div>
  );
}

export default Game;
