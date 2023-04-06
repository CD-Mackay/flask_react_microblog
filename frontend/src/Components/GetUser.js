import { useState } from 'react';

function GetUser() {


  function getUser() {
    const user = localStorage.getItem('user');
    return user && user
  }

  const [user, setUser] = useState(getUser());

  function saveUser(user) {
    console.log("user", user)
    localStorage.setItem('user', user);
    setUser(user);
  };

  function removeUser() {
    localStorage.removeItem("user");
    setUser(null)
  }

  return {
    user,
    saveUser,
    removeUser,
    getUser
  }
}

export default GetUser