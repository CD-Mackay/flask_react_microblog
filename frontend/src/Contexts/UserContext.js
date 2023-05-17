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
    setUserProfile({
      username: data.username,
      id: data.id,
    });
  };

  const changeUserName = async (user, newName, token) => {
    const res = await fetch(`/change_username/${user}/${newName}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    console.log(data);
  }


  /**
   * Context Component to handle Connect Four Game Logic
   */

  return (
    <UserContext.Provider
      value={{
        fetchUserProfile,
        userProfile,
        changeUserName
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}