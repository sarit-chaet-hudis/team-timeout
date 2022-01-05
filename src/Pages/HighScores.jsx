import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import back1 from "../Assets/images/WallpaperDog-16992345.jpg";
import cocktail1 from "../Assets/images/cocktail3.png";

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
          <Cocktail />
        </div>
      </Wrapper>
    </HighScorePage>
  );
};

export default HighScores;

const HighScorePage = styled.div`
  background: url(${back1}) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  padding: 0 30px;
  height: 100%;
`;

const Wrapper = styled.div`
  background: #ffffffe1;
  width: 80vmin;
  padding: 20px;
  text-align: center;
  height: 100vh;
`;

const HighScoreTable = styled.div`
  display: grid;
  gap: 20px;
  margin: 20px auto 40px;
`;

const HighScore = styled.div`
  display: grid;
  width: 70vmin;
  border-radius: 30px;
  background-color: #28ada950;
  grid-template-columns: 50vmin 20vmin;
  margin: auto;
`;

const Score = styled.div`
  text-align: center;
`;

const Cocktail = styled.div`
  background: url(${cocktail1}) no-repeat 50%;
  background-size: 10%;
  transform: rotate(15deg);
  height: 200px;
`;
