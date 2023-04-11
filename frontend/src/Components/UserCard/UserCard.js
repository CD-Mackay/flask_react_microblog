//Library Imports
import React from "react";
import Button from "../Button/Button";

// Styling Imports
import "./UserCard.css";

// Component Imports

const UserCard = ({ profile }) => {
  const handleFollowChange = (event) => {
    event.preventDefault();
    console.log(event);
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: profile.id,
      }),
    };
    fetch(`follow/${profile.username}`, requestOptions)
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        return console.log(error);
      });
  };

  return (
    <div>
      <div className="user-header">
        <h4>{profile.username}</h4>
        {profile.followed !== undefined && (
          <Button
            message={profile.followed === true ? "Unfollow" : "Follow"}
            onClick={handleFollowChange}
          />
        )}
      </div>
    </div>
  );
};

export default UserCard;
