// Library Imports
import React, { useContext, useEffect, useState } from "react";

// Style Imports

// Component Imports
import NewPost from "../Components/NewPost/NewPost";
import PostList from "../Components/PostList/PostList";
import UseToken from "../Components/UseToken";
import { UserContext } from "../Contexts/UserContext";

const Explore = () => {
  const [posts, setPosts] = useState("");

  const { token } = UseToken();
  const { getPosts } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      getPosts(token).then((posts) => setPosts(posts));
    }
  }, [token]);
  return (
    <div className="App">
      <NewPost />
      <PostList posts={posts} />
    </div>
  );
};

export default Explore;
