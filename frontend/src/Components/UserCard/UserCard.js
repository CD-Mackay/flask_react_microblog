//Library Imports
import React, { useState } from "react";
import Button from "../Button/Button";

// Styling Imports
import "./UserCard.css";

// Component Imports

const UserCard = () => {

  const [followed, setFollowed] = useState(false);

  const handeFollow = () => {
    followed ? setFollowed(false) : setFollowed(true);
    console.log("handlingFollow!")
  }

  return (
    <div>
      <div className="user-header">
      <h4>Username</h4>
      <Button message={followed ? "Unfollow" : "Follow"} onClick={handeFollow} />
      </div>
      <p>List of Posts goes here</p>
    </div>
  );
};

export default UserCard;
