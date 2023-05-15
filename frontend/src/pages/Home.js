// Library Imports
import React, { useEffect, useState } from "react";
import GetUser from "../Components/GetUser";

// Style Imports

// Component Imports
import NewPost from "../Components/NewPost/NewPost";
import PostList from "../Components/PostList/PostList";
import UseToken from "../Components/UseToken";

const Home = () => {
  const { user } = GetUser();
  const { token } = UseToken();

  const [followedPosts, setFollowedPosts] = useState("");

  useEffect(() => {
    const getFollowedPosts = async () => {
      try {
        const res = await fetch(`/followed_posts/${user}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await res.json();
        setFollowedPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowedPosts();
  }, []);
  return (
    <div className="App">
      <NewPost />
      <PostList posts={followedPosts} />
    </div>
  );
};

export default Home;
