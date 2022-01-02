import { useState } from "react";
import { Link } from "react-router-dom";
import Picker from "emoji-picker-react";
import styled from "styled-components";

const CreateGame = ({ blocks, updateBlocks }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const onTitleChange = (e) => {
    const i = e.target.id;
    const newBlockArray = blocks.slice();
    newBlockArray[i].title = e.target.value;
    updateBlocks(newBlockArray);
  };

  const getActiveEmojiIndex = () => {
    return showEmojiPicker.indexOf(true);
  };

  const onEmojiClick = (e, emojiObj) => {
    const i = getActiveEmojiIndex();
    const newBlockArray = blocks.slice();
    newBlockArray[i].emoji = emojiObj.emoji;
    updateBlocks(newBlockArray);
    closeEmojiPicker(i);
  };

  const closeEmojiPicker = (i) => {
    const newArray = showEmojiPicker.slice();
    newArray[i] = false;
    setShowEmojiPicker(newArray);
  };

  const showPicker = (e) => {
    e.preventDefault();
    const newArray = showEmojiPicker.slice();
    newArray[e.target.id] = true;
    setShowEmojiPicker(newArray);
  };

  const renderSelectors = () => {
    return blocks.map((block) => {
      return (
        <Selector key={block.color}>
          <div className="gameBlock" style={{ backgroundColor: block.color }}>
            <div className="emoji">{block.emoji}</div>
            {block.title}
          </div>
          <input
            id={block.index}
            type="text"
            placeholder={`Block ${+block.index + 1} Title`}
            value={block.title}
            onChange={(e) => onTitleChange(e)}
            maxLength="10"
          ></input>
          <button id={block.index} onClick={(e) => showPicker(e)}>
            Pick Emoji
          </button>
          {showEmojiPicker[block.index] ? (
            <Picker onEmojiClick={onEmojiClick} />
          ) : (
            ""
          )}
        </Selector>
      );
    });
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
      <form>{renderSelectors()}</form>
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
