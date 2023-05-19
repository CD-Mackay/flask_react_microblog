// Library Imports
import React, { useEffect, useState, useRef } from "react";
import GetUser from "../Components/GetUser";
import { Link } from "react-router-dom";

// Style Imports

// Component Imports
import NewPost from "../Components/NewPost/NewPost";
import PostList from "../Components/PostList/PostList";
import UseToken from "../Components/UseToken";
import Button from "../Components/Button/Button";

const Home = () => {
  const { user } = GetUser();
  const { token } = UseToken();

  const [followedPosts, setFollowedPosts] = useState([]);


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
    if (token && followedPosts !== []) {
      getFollowedPosts();
    }
  }, []);
  return (
    <div className="App">
      <NewPost />
      {followedPosts && <PostList posts={followedPosts} />}
      {followedPosts.length === 0 && token && (
        <div>
          <p>
            Looks like you aren't following anyone yet, click here to view new
            posts
          </p>
          <Link to="/explore">
            <Button message="Explore" />
          </Link>
        </div>
      )}
      {!token && (
        <div id="login-home-message">
          <p>Login or Sign up to start reading blog posts</p>
          <Link to="/login">
            <Button message="Login" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
