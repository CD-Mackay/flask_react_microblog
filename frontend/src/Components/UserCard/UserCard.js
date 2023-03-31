//Library Imports
import React, { useState } from "react";
import Button from "../Button/Button";

// Styling Imports
import "./UserCard.css";

// Component Imports

const UserCard = ({username}) => {

  const [followed, setFollowed] = useState(false);

  const handeFollow = () => {
    followed ? setFollowed(false) : setFollowed(true);
  }

  return (
    <div>
      <div className="user-header">
      <h4>{username}</h4>
      <Button message={followed ? "Unfollow" : "Follow"} onClick={handeFollow} />
      </div>
    </div>
  );
};

export default UserCard;
