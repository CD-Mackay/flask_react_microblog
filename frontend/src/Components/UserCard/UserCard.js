//Library Imports
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

// Styling Imports
import "./UserCard.css";

// Component Imports

const UserCard = ({ profile, user, token }) => {

  const [followed, setFollowed] = useState(profile.followed);
  const handleFollowChange = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: profile.id,
      }),
    };
    if (profile.followed === true) {
      try {
        const response = await fetch(
          `unfollow/${profile.id}/${user}`,
          requestOptions
        );
        setFollowed(false)
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else if (profile.followed === false) {
      try {
        const response = await fetch(
          `follow/${profile.id}/${user}`,
          requestOptions
        );
        setFollowed(true)
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setFollowed(profile.followed)
  }, [profile])

  return (
    <div>
      <div className="user-header">
        <h4 testid="username">{profile.username}</h4>
        {profile.followed !== undefined && (
          <Button
            message={followed === true ? "Unfollow" : "Follow"}
            onClick={handleFollowChange}
          />
        )}
      </div>
    </div>
  );
};

export default UserCard;
