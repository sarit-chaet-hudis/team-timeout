import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Picker from "emoji-picker-react";
import styled from "styled-components";

const CreateGame = ({ blocks, updateBlocks }) => {
  //const [chosenEmoji, setChosenEmoji] = useState(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const onTitleChange = (e) => {
    blocks[e.target.id].title = e.target.value;
    const newBlock = blocks[e.target.id];
    const newBlockArray = [...blocks.splice(e.target.id, 1, newBlock)];
    updateBlocks(newBlockArray);
  };

  const getActiveEmojiIndex = () => {
    return showEmojiPicker.indexOf(true);
  };

  const onEmojiClick = (e, emojiObj) => {
    const i = getActiveEmojiIndex();
    const newBlock = blocks[i];
    newBlock.emoji = emojiObj.emoji;
    const newBlockArray = [...blocks.splice(i, 1, newBlock)];
    updateBlocks(newBlockArray);
    const newArray = showEmojiPicker.slice();
    newArray[i] = false;
    setShowEmojiPicker(newArray);
  };

  const showPicker = (e) => {
    e.preventDefault();
    const newArray = showEmojiPicker.slice();
    newArray[0] = true;
    setShowEmojiPicker(newArray);
  };

  return (
    <div>
      <h1>Create your own Team Game!</h1>
      <div>
        What will be your team's game blocks?
        <br />
        Think of everyday activities, nothing special - like a coffee break,
        team meeting, daily, 1 on 1 or lunch. etc.
      </div>
      <form>
        <Selector>
          <div className="gameBlock" style={{ backgroundColor: "#FF1780" }}>
            <div className="emoji">{blocks[0].emoji}</div>

            {blocks[0].title}
          </div>
          <input
            id="0"
            type="text"
            placeholder="Block1"
            value={blocks[0].title}
            onChange={(e) => onTitleChange(e)}
            maxLength="10"
          ></input>
          <button id="0" onClick={(e) => showPicker(e)}>
            Pick Emoji
          </button>
          {showEmojiPicker[0] ? <Picker onEmojiClick={onEmojiClick} /> : ""}
        </Selector>
      </form>
      <button>Save and get link</button>
      <Link to="/">Play</Link>
    </div>
  );
};

export default CreateGame;

const Selector = styled.div`
  display: flex;
  align-items: center;
  input {
    height: fit-content;
    border-radius: 5px;
    margin: 0px 15px;
  }

  button {
    border-radius: 5px;
    margin: 0px 15px;
  }
`;
