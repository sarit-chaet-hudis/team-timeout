import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import back1 from "../Assets/images/WallpaperDog-16992345.jpg";

const HighScores = () => {
  const [teamSettings, setTeamSettings] = useState({});

  const { teamUid } = useParams();

  const navigate = useNavigate();

  const getTeamSettingsFromApi = async () => {
    try {
      const teamData = await axios.get(
        `https://team-timeout-server.herokuapp.com/api/get/${teamUid}`
      );

      const teamSettingsFromApi = {
        teamName: teamData.data.teamName,
        highscores: teamData.data.highscores,
      };

      setTeamSettings(teamSettingsFromApi);
      console.log("~ teamSettingsFromApi", teamSettingsFromApi);
    } catch (err) {
      console.log(`sorry, can't get team data. ${err}`);
    }
  };

  useEffect(() => {
    getTeamSettingsFromApi();
  }, []); // eslint-disable-line

  const renderScores = () => {
    try {
      return teamSettings.highscores.map((score, index) => {
        return (
          <HighScore key={index}>
            <div>{score.playerName}</div>
            <Score>{score.score.toLocaleString()}</Score>
          </HighScore>
        );
      });
    } catch (err) {
      console.log(err.message);
    }
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
            Play Again!
          </button>
        </div>
      </Wrapper>
    </HighScorePage>
  );
};

export default HighScores;

const HighScorePage = styled.div`
  background: url(${back1}) no-repeat center;
  background-size: cover;
  background-attachment: fixed;
  padding: 0 30px;
  height: 100%;
`;

const Wrapper = styled.div`
  background: #ffffffe1;
  width: 60vw;
  text-align: center;
  height: 100vh;
  overflow-y: scroll;
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
