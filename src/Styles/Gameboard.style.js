import styled from "styled-components";

const BoardStyled = styled.div`
  display: flex;
  width: 90vmin;
  min-width: 90vmin;
  height: 90vmin;
  display: flex;
  flex-wrap: wrap;
`;

const GameBlockStyled = styled.div`
  position: relative;
  margin: 5px;
  border-radius: 40%;
  width: calc(90vmin / 8 - 10px);
  height: calc(90vmin / 8 - 10px);
  box-shadow: rgba(240, 224, 0, 0.424) 0px -13px 15px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-size: 1.7vmin;
`;

const EmojiStyled = styled.span`
  font-size: 3vmin;
  line-height: 3min;
`;

const EmptyStyled = styled.div`
  background-color: transparent;
  box-shadow: none;
`;

export { BoardStyled, GameBlockStyled, EmptyStyled, EmojiStyled };
