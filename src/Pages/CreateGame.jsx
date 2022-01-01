import { Link } from "react-router-dom";

const CreateGame = () => {
  return (
    <div>
      <h1>Create your own Team Game!</h1>
      <button>Save and get link</button>
      <Link to="/play">Play</Link>
    </div>
  );
};

export default CreateGame;
