import { useState } from 'react';

function GetUser() {


  function getUser() {
    const user = localStorage.getItem('user');
    return user && user
  }

  const [user, setUser] = useState(getUser())

  function saveUser(user) {
    console.log("user", user)
    localStorage.setItem('user', user);
    setUser(user);
  };

  function removeToken() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return {
    saveUser,
    user,
    removeToken,
    getUser
  }
}

export default GetUser