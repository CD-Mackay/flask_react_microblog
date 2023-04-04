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

  const handleFollowChange = (event) => {
    event.preventDefault();
    console.log(event);
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
    }
    fetch(`follow/${username}`, requestOptions)
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        return console.log(error);
      });
  }

  return (
    <div>
      <div className="user-header">
      <h4>{username}</h4>
      <Button message={followed ? "Unfollow" : "Follow"} onClick={handleFollowChange} />
      </div>
    </div>
  );
};

export default UserCard;
