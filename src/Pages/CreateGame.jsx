import { useRef, useState } from "react";
import axios from "axios";
import Picker from "emoji-picker-react";
import styled from "styled-components";
import { defaultBlocks } from "./defaultBlocks";
import back1 from "../Assets/images/WallpaperDog-16992345.jpg";

const CreateGame = () => {
  const [teamName, setTeamName] = useState("");
  const [URL, setURL] = useState("");
  const [blocks, updateBlocks] = useState(defaultBlocks);
  const [userMessage, setUserMessage] = useState("");
  const linkRef = useRef(null);

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
    setUserMessage("Saving..");
    const teamSettings = {
      teamUid: generateTeamUid(),
      teamName: teamName,
      blocks: blocks,
    };

    try {
      await axios.post(
        `https://team-timeout-server.herokuapp.com/api/add/`,
        teamSettings
      );
      setUserMessage("");

      setURL(`https://team-timeout.netlify.app/play/${teamSettings.teamUid}`);
    } catch (err) {
      setUserMessage("sorry, failed to save team data.", err);
    } finally {
      linkRef.current.scrollIntoView({
        behavior: "smooth",
      });
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
    <Create>
      <Wrapper>
        <h1>Team Timeout</h1>
        <h3>
          Create your own Team Game in 3 simple steps, play and compete against
          each other!
        </h3>
        <label htmlFor="teamName">
          <span className="number">1.</span> Enter your Team's Name:
        </label>
        <br />
        <input
          type="text"
          name="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        ></input>
        <div>
          <span className="number">2.</span> What will be your team's game
          blocks?
          <br />
          Think of everyday activities, see examples below. Then choose an emoji
          for each activity.
        </div>
        <form>{renderSelectors()}</form>

        <span className="number">3.</span>
        <button onClick={saveTeamSettings} className="shiny">
          Save and get link
        </button>
        <br />
        {URL.length > 0 ? (
          <div>
            <a href={URL} ref={linkRef}>
              Link to Your team's game
            </a>{" "}
            <br />
            Share and Enjoy!
          </div>
        ) : null}
        <div className="message">{userMessage}</div>
      </Wrapper>
    </Create>
  );
};

export default CreateGame;

const Create = styled.div`
  background: url(${back1}) no-repeat center;
  background-size: cover;
  background-attachment: fixed;
  padding: 0 30px;
  height: 100%;
`;

const Wrapper = styled.div`
  background: #ffffffe1;
  width: 60vw;
  padding: 20px;
  text-align: center;
  height: 100vh;
  overflow-y: scroll;
  .message {
    margin-bottom: 40px;
  }
`;

const Selector = styled.div`
  display: flex;
  align-items: center;
  height: calc(90vmin / 8);
  position: relative;
`;
