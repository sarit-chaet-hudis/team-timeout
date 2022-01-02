import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Picker from "emoji-picker-react";

const CreateGame = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const [showEmojiPicker, toggleShowEmojiPicker] = useState(false);

  const onEmojiClick = (e, emojiObj) => {
    e.preventDefault();
    setChosenEmoji(emojiObj);
    toggleShowEmojiPicker(false);
    console.log(chosenEmoji);
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
        Think of every activities - like a coffee break, team meeting, daily,
        etc.
      </div>
      <form>
        <input type="text" placeholder="Block1"></input>
        <button onClick={(e) => showPicker(e)}>Pick Emoji</button>
        {showEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : ""}
        <br />
        <input type="text" placeholder="Block2"></input>
        <button onClick={(e) => showPicker(e)}>Pick Emoji</button>
        {showEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : ""}
        <br />
        <input type="text" placeholder="Block3"></input>
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
        <br />
      </form>
      <button>Save and get link</button>
      <Redirect to="/">Play</Redirect>
    </div>
  );
};

export default CreateGame;
