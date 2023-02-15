// Library Imports
import React from "react";

// Style Imports

// Component Imports
import { Link } from "react-router-dom";


const Home = ({ token, showLogin, time, posts }) => {
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
