// Library Imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Component Imports
import UserCard from "../Components/UserCard/UserCard";
import PostList from "../Components/PostList/PostList";
import UseToken from "../Components/UseToken";
import GetUser
 from "../Components/GetUser";
const Profile = ({ posts, userProfile }) => {
  const { token } = UseToken();
  const { user } = GetUser();
  const location = useLocation();
  const profileId = Number(location.pathname.slice(6));
  const [profile, setProfile] = useState({
    username: "",
    id: "",
    followed: null
  });

  console.log("profile", profile)

  const showUserPosts = () => {
    let userPosts = posts.filter((post) => post.user_id === profileId);
    return <PostList posts={userPosts} />;
  };

  useEffect(() => {
    async function fetchProfile(profileId, token, user) {
      const response = await fetch(`/profile/${profileId}/${user}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      return {
        username: data.username,
        id: data.id,
        followed: data.is_following
      };
    }

    fetchProfile(profileId, token, user).then((profile) => setProfile(profile));
  }, []);
  return (
    <div className="App">
      <p>I am Profilepage</p>
      {posts && !posts.msg && showUserPosts()}
      <UserCard profile={profile} />
    </div>
  );
};

export default Profile;
