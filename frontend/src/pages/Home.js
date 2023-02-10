// Library Imports
import React from "react";
import { Link } from "react-router-dom";
// Style Imports
// Component Imports

const Home = ({ token, showLogin, time, posts }) => {
  console.log("home", token)
  return (
    <div className="App">
      <p>{time}</p>

      {token && token !== "" && token !== undefined && token !== null && (
        <p>{posts}</p>
      )}

      {!showLogin && !token && (
        <Link to="/login">
          <button>Login?</button>
        </Link>
      )}
    </div>
  );
};

export default Home;
