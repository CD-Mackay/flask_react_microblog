// Library Imports
import React from "react";

// Style Imports

// Component Imports
import NewPost from "../Components/NewPost/NewPost";
import PostList from "../Components/PostList/PostList";

const Home = ({ token, time, posts, user }) => {

  const dummyPosts = [
    {
      title: "post1",
      content: "postcontent",
      author: "somegiuy",
    },
    {
      title: "post1",
      content: "postcontent",
      author: "somegiuy",
    },
    {
      title: "post1",
      content: "postcontent",
      author: "somegiuy",
    },
  ];
  return (
    <div className="App">
      <p>{time}</p>

      {/* {token && token !== "" && token !== undefined && token !== null && ( */}
      <PostList posts={posts} dPosts={dummyPosts} />
      <NewPost user={user} />
      {/* )} */}
    </div>
  );
};

export default Home;
