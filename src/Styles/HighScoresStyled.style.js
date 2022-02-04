import styled from "styled-components";
import back1 from "../Assets/images/WallpaperDog-16992345.jpg";

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

export { HighScorePage, Wrapper, HighScoreTable, HighScore, Score };
