import { useState } from 'react';

function UseToken() {
  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken())

  function saveToken(userToken) {
    console.log("token", userToken)
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return {
    saveToken,
    token,
    removeToken
  }
}

export default UseToken