import Score from "./Score";
import Timer from "./Timer";

const GameControls = () => {
  return (
    <div className="GameControls">
      <Score />
      <Timer />
      <button>New Game</button>
    </div>
  );
};

export default GameControls;
