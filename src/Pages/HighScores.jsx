import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const HighScores = () => {
  const { state } = useLocation();
  const { teamSettings, teamUid } = state;

  const renderScores = () => {
    return teamSettings.highscores.map((score, index) => {
      return (
        <HighScore key={index}>
          <div>{score.playerName}</div>
          <Score>{score.score}</Score>
        </HighScore>
      );
    });
  };

  return (
    <>
      <h1>Team {teamSettings.teamName} HighScores:</h1>
      <HighScoreTable>{renderScores()}</HighScoreTable>
      <div>
        <Link to={`/play/${teamUid}`}>Play Again?</Link>
      </div>
    </>
  );
};

export default HighScores;

const HighScoreTable = styled.div`
  display: grid;

  gap: 20px;
`;

const HighScore = styled.div`
  display: grid;
  width: 70vmin;
  border: 1px solid gray;
  grid-template-columns: 50vmin 20vmin;
`;

const Score = styled.div`
  text-align: center;
`;
