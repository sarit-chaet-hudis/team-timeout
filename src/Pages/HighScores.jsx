import { useLocation, useNavigate } from "react-router-dom";

import {
  HighScorePage,
  Wrapper,
  HighScoreTable,
  HighScore,
  Score,
} from "../Styles/HighScoresStyled.style";

const HighScores = () => {
  const { state } = useLocation();
  const { teamSettings, teamUid } = state;
  const navigate = useNavigate();

  const renderScores = () => {
    return teamSettings.highscores.map((score, index) => {
      return (
        <HighScore key={index}>
          <div>{score.playerName}</div>
          <Score>{score.score.toLocaleString()}</Score>
        </HighScore>
      );
    });
  };

  const goToPlay = () => {
    navigate(`../play/${teamUid}`, {
      replace: true,
    });
  };

  return (
    <HighScorePage>
      <Wrapper>
        <h1>Team {teamSettings.teamName} HighScores:</h1>
        <HighScoreTable>{renderScores()}</HighScoreTable>
        <div>
          <button className="shiny" onClick={goToPlay}>
            Play Again
          </button>
        </div>
      </Wrapper>
    </HighScorePage>
  );
};

export default HighScores;
