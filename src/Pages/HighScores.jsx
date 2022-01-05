import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HighScores = () => {
  const location = useLocation();
  const { teamSettings, teamUid } = location.state;

  const renderScores = () => {
    return teamSettings.highscores.map((score, index) => {
      return (
        <HighScore key={index}>
          <div>{score.playerName}</div>
          <div>{score.score}</div>
        </HighScore>
      );
    });
  };

  return (
    <>
      <h1>Team {teamSettings.teamName} HighScores:</h1>
      {renderScores()}
      <div>
        <Link to={`/play/${teamUid}`}>Play Again?</Link>
      </div>
    </>
  );
};

export default HighScores;

const HighScore = styled.div`
  display: grid;
  border: 10x solid gray;
  grid-template-columns: 50vmin 20vmin;
  gap: 20px;
`;
