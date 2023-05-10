// Library Imports
import React, { useEffect, useState } from "react";

// Style Imports

// Component Imports
import NewPost from "../Components/NewPost/NewPost";
import PostList from "../Components/PostList/PostList";
import UseToken from "../Components/UseToken";

const Explore = ({ time, userProfile }) => {

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
      <p>{time}</p>
      <NewPost user={userProfile} />
      <PostList posts={posts} />
    </div>
  );
};

export default Explore;
