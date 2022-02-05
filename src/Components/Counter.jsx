import styled from "styled-components";

const Counter = ({ counterName, currCount }) => {
  return (
    <Wrapper>
      <h2>{counterName}</h2>
      {currCount.toLocaleString()}
    </Wrapper>
  );
};

export default Counter;

const Wrapper = styled.div`
  margin: 10px auto 30px;
  background: #ffffffe1;
  border-radius: 30px;
  padding: 0 30px 20px;
  box-shadow: rgba(70, 91, 109, 0.48) 6px 2px 16px 0px;
  font-family: "Lobster", cursive, "Secular One";
  & h2 {
    margin-bottom: 0;
  }
`;
