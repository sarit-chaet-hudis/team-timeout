import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Picker from "emoji-picker-react";

const CreateGame = ({ blocks, updateBlocks }) => {
  //const [chosenEmoji, setChosenEmoji] = useState(null);

  const [showEmojiPicker, toggleShowEmojiPicker] = useState(false);

  const onTitleChange = (e) => {
    blocks[e.target.id].title = e.target.value;
    const newBlock = blocks[e.target.id];
    const newBlockArray = [...blocks.splice(e.target.id, 1, newBlock)];
    updateBlocks(newBlockArray);
    console.log(blocks[e.target.id]);
  };

  const onEmojiClick = (e, emojiObj) => {
    e.preventDefault();
    //setChosenEmoji(emojiObj);
    toggleShowEmojiPicker(false);
  };

  useEffect(
    () => console.log(`showEmojiPicker is ${showEmojiPicker}`),
    [showEmojiPicker]
  );

  const showPicker = (e) => {
    e.preventDefault();
    toggleShowEmojiPicker(true);
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
        <div className="gameBlock" style={{ backgroundColor: "#FF1780" }}>
          {blocks[0].emoji}
          <br />
          {blocks[0].title}
        </div>
        <input
          id="0"
          type="text"
          placeholder="Block1"
          value={blocks[0].title}
          onChange={(e) => onTitleChange(e)}
        ></input>
        <button onClick={(e) => showPicker(e)}>Pick Emoji</button>
        {showEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : ""}
        <br />
        <input type="text" placeholder="Block2"></input>
        <button onClick={(e) => showPicker(e)}>Pick Emoji</button>
        {showEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : ""}
        <br />
        {/* <input type="text" placeholder="Block3"></input>
        <button onClick={(e) => showPicker(e)}>Pick Emoji</button>
        {showEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : ""}
        <br />
        <input type="text" placeholder="Block4"></input>
        <button onClick={(e) => showPicker(e)}>Pick Emoji</button>
        {showEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : ""}
        <br />
        <input type="text" placeholder="Block5"></input>
        <button onClick={(e) => showPicker(e)}>Pick Emoji</button>
        {showEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : ""}
        <br />
        <input type="text" placeholder="Block6"></input>
        <button onClick={(e) => showPicker(e)}>Pick Emoji</button>
        {showEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : ""}
        <br /> */}
      </form>
      <button>Save and get link</button>
      <Link to="/">Play</Link>
    </div>
  );
};

export default CreateGame;
