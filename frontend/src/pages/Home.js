// Library Imports
import React from "react";

// Style Imports

// Component Imports
import NewPost from "../Components/NewPost/NewPost";
import PostList from "../Components/PostList/PostList";

const Home = ({ token, time, posts, userProfile }) => {

  return (
    <div className="App">
      <p>{time}</p>

      {/* {token && token !== "" && token !== undefined && token !== null && ( */}
      <PostList posts={posts} />
      <NewPost user={userProfile} />
      {/* )} */}
    </div>
  );
};

export default Home;
