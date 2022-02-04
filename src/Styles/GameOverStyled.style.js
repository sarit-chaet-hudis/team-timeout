import styled from "styled-components";

const GameOverStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  line-height: 2;

  a,
  a:visited {
    color: white;
  }
`;

export default GameOverStyled;
