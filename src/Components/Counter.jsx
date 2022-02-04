import CounterStyled from "../Styles/CounterStyled.style";

const Counter = ({ counterName, currCount }) => {
  return (
    <CounterStyled>
      <h2>{counterName}</h2>
      {currCount.toLocaleString()}
    </CounterStyled>
  );
};

export default Counter;
