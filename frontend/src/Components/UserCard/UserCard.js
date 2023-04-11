//Library Imports
import React from "react";
import Button from "../Button/Button";

// Styling Imports
import "./UserCard.css";

// Component Imports

const UserCard = ({ profile, user }) => {

  const followUser = async (event) => {
    event.preventDefault();
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
    try {
      const response = await fetch(
        `follow/${profile.id}/${user}`,
        requestOptions
      );
      console.log(response);
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="user-header">
        <h4>{profile.username}</h4>
        {profile.followed !== undefined && (
          <Button
            message={profile.followed === true ? "Unfollow" : "Follow"}
            onClick={followUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserCard;
