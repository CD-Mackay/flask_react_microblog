import { useState } from 'react';

function UseToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken())

  function saveToken(token) {
    console.log("token", token)
    localStorage.setItem('token', token);
    setToken(token);
  };

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return {
    saveToken,
    token,
    removeToken,
    getToken
  }
}

export default UseToken