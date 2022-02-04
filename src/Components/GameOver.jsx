import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GameOverStyled from "../Styles/GameOverStyled.style";

const GameOver = ({
  currScore,
  teamSettings,
  saveToHighScores,
  newGame,
  teamUid,
}) => {
  const [playerName, setPlayerName] = useState("");

  let navigate = useNavigate();

  const goToHighScores = () => {
    navigate("../highscores", {
      replace: true,
      state: {
        teamSettings: teamSettings,
        teamUid: teamUid,
      },
    });
  };

  const onNameSave = async () => {
    await saveToHighScores(playerName);
    goToHighScores();
  };

  return (
    <GameOverStyled>
      <h1>Game Over</h1>
      You got {currScore.toLocaleString()} points!
      <div>Type your name to get into the highscores list:</div>
      <input
        type="text"
        placeholder="Your name here"
        onChange={(e) => setPlayerName(e.target.value)}
        value={playerName}
        maxLength="20"
      ></input>
      <button className="shiny" onClick={() => onNameSave(playerName)}>
        Save Name
      </button>
      <button onClick={() => goToHighScores()}>See High Scores</button>
      <button onClick={() => newGame()}>New Game</button>
    </GameOverStyled>
  );
};

export default GameOver;
