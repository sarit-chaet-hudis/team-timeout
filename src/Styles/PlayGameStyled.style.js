import styled from "styled-components";
import back1 from "../Assets/images/WallpaperDog-16992541.jpg";

const Wrapper = styled.div`
  background: url(${back1}) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  padding: 0 30px;
  display: flex;
  align-items: center;
  height: 100vh;
  & h1 {
    color: white;
    text-shadow: 2px 2px 5px #333;
  }
`;

const Controls = styled.div`
  height: 50vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  justify-content: space-around;
  text-align: center;
`;

export { Wrapper, Controls };
