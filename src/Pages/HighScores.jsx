import { useLocation } from "react-router-dom";

const HighScores = () => {
  const location = useLocation();
  const { teamSettings } = location.state;

  const renderScores = () => {
    return teamSettings.highscores.map((score) => score.score);
  };

  return (
    <>
      <h1>Team {teamSettings.teamName} HighScores:</h1>
      {renderScores()}
    </>
  );
};

export default HighScores;
