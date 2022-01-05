import styled from "styled-components";

const Score = ({ currScore }) => {
  return (
    <ShowScore>
      <h2>Score:</h2>
      {currScore.toLocaleString()}
    </ShowScore>
  );
};

export default Score;

const ShowScore = styled.div`
  background: #ffffffe1;
  border-radius: 30px;
  padding: 0 30px 20px;
  box-shadow: rgba(70, 91, 109, 0.48) 6px 2px 16px 0px;
  font-family: "Lobster", cursive, "Secular One";
  & h2 {
    margin-bottom: 0;
  }
`;
