import { useState } from "react";
import axios from "axios";
import Picker from "emoji-picker-react";
import styled from "styled-components";

const CreateGame = ({ blocks, updateBlocks }) => {
  const [teamName, setTeamName] = useState("");

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

  const generateTeamUid = () => {
    return (Math.random() + 1).toString(36).substring(2) + Date.now();
  };

  const saveTeamSettings = async () => {
    const teamSettings = {
      //  obj: {
      //     "blocks" : [{id, color, title, emoji},{},..],
      //     "highscores" : [{rank,name,score},{}..],
      //     "teamName" : "team name",
      //     "teamUid" : "lfgh94t0u35"
      //     }
      teamUid: generateTeamUid(),
      teamName: teamName,
      blocks: blocks,
      highscores: [],
    };

    try {
      await axios.post(
        `https://61d2d7dcb4c10c001712b604.mockapi.io/teams/teams/`,
        teamSettings
      );
      console.log(
        `Your team's game url is https://team-timeout.netlify.app/play/${teamSettings.teamUid} Share and Enjoy!`
      );
    } catch (err) {
      console.log("sorry, failed to save team data.", err);
    }
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
      <h1>Team Timeout</h1>
      <h3>Create your own Team Game, and compete against each other!</h3>
      <label htmlFor="teamName">Enter your Team's Name:</label>
      <input
        type="text"
        name="teamName"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      ></input>
      <hr />
      <div>
        What will be your team's game blocks?
        <br />
        Think of everyday activities, see examples below. Then choose an emoji
        for each activity.
      </div>
      <form>{renderSelectors()}</form>
      <hr />
      <button onClick={saveTeamSettings}>Save and get link</button>
      {/* <Link to="/play">Play</Link> */}
    </div>
  );
};

export default CreateGame;

const Selector = styled.div`
  display: flex;
  align-items: center;
`;
