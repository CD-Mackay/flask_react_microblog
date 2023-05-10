// Library Imports
import React, { useEffect, useState } from "react";

// Style Imports

// Component Imports
import NewPost from "../Components/NewPost/NewPost";
import PostList from "../Components/PostList/PostList";

const Home = ({ time, posts, userProfile }) => {

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

  }, []);
  return (
    <div className="App">
      <p>{time}</p>
      <NewPost user={userProfile} />
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
