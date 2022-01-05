import { useLocation } from "react-router-dom";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HighScores = () => {
  const location = useLocation();
  const { teamSettings } = location.state;

  const renderScores = () => {
    return teamSettings.highscores.map((score) => {
      return (
        <HighScore>
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
    </>
  );
};

export default HighScores;

const HighScore = styled.div`
  display: flex;
  border: 10x solid gray;
`;
