// Library Imports
import React, { useEffect, useState } from "react";

// Style Imports

// Component Imports
import NewPost from "../Components/NewPost/NewPost";
import PostList from "../Components/PostList/PostList";
import UseToken from "../Components/UseToken";

const Explore = () => {
  const [posts, setPosts] = useState("");

  const { token } = UseToken();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch("/posts", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);
  return (
    <div className="App">
      <NewPost />
      <PostList posts={posts} />
    </div>
  );
};

export default Explore;
