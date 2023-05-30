// Library Imports
import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider(props) {

    const [userProfile, setUserProfile] = useState({
    username: "",
    id: 0,
    posts: [],
  });

  const fetchUserProfile = async (user, token) => {
    if (!user) return;
    const res = await fetch(`/profile/${user}/${user}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    console.log("setting userprofile")
    console.log(data);
    setUserProfile({
      username: data.username,
      id: data.id,
    });
  };

  async function fetchProfile(profileId, token, user) {
    const response = await fetch(`/profile/${profileId}/${user}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    console.log(data);
    return {
      username: data.username,
      id: data.id,
      followed: data.is_following,
    };
  }

  const getPosts = async (token) => {
    try {
      const res = await fetch("/posts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };


  /**
   * Context Component to handle Connect Four Game Logic
   */

  return (
    <UserContext.Provider
      value={{
        fetchUserProfile,
        userProfile,
        setUserProfile,
        fetchProfile,
        getPosts
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}