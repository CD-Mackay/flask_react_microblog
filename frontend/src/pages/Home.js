import React from "react";
import { Link } from "react-router-dom";

const Home = ({ token, showLogin, saveToken, time, posts, setShowLogin }) => {
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
