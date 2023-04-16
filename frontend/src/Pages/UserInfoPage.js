import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, globalSignOut, signOut } from "../util/awsFunctions";

export const UserInfoPage = () => {
  const navigate = useNavigate();

  const [favoriteFood, setFavoriteFood] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [bio, setBio] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const saveChanges = async () => {
    alert("Save functionality not implemented yet");
  };

  const logOut = async () => {
    signOut(navigate);
  };

  const resetValues = () => {
    alert("Reset functionality not implemented yet");
  };

  return (
    <div className="content-container">
      <h1>Info for ______</h1>
      {showSuccessMessage && (
        <div className="success">Successfully saved user data!</div>
      )}
      {showErrorMessage && (
        <div className="fail">
          Uh oh... something went wrong and we couldn't save changes
        </div>
      )}
      <label>
        Favorite Food:
        <input
          onChange={(e) => setFavoriteFood(e.target.value)}
          value={favoriteFood}
        />
      </label>
      <label>
        Hair Color:
        <input
          onChange={(e) => setHairColor(e.target.value)}
          value={hairColor}
        />
      </label>
      <label>
        Bio:
        <input onChange={(e) => setBio(e.target.value)} value={bio} />
      </label>
      <hr />
      <button onClick={saveChanges}>Save Changes</button>
      <button onClick={resetValues}>Reset Values</button>
      <button onClick={logOut}>Log Out</button>
      <button
        onClick={() => {
          globalSignOut(navigate);
        }}
      >
        Global SignOut
      </button>

      <button
        onClick={() => {
          deleteUser(navigate);
        }}
      >
        Delete User
      </button>
    </div>
  );
};
