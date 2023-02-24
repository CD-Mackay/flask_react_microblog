// Library Imports
import React from "react";

// Style Imports

// Component Imports
import { Link } from "react-router-dom";
import PostList from "../Components/PostList/PostList";


const Home = ({ token, showLogin, time, posts }) => {
  return (
    <div className="App">
      <p>{time}</p>

      {token && token !== "" && token !== undefined && token !== null && (
        <PostList posts={posts} />
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
