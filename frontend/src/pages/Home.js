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
      <NewPost user={userProfile} />
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
