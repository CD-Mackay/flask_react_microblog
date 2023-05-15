// Library Imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Component Imports
import UserCard from "../Components/UserCard/UserCard";
import PostList from "../Components/PostList/PostList";
import UseToken from "../Components/UseToken";
import GetUser from "../Components/GetUser";
const Profile = () => {
  const { token } = UseToken();
  const { user } = GetUser();
  const location = useLocation();
  const profileId = Number(location.pathname.slice(6));
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState({
    username: "",
    id: "",
    followed: null,
  });
  const userPosts = posts
    ? posts.filter((post) => post.user_id === profileId)
    : [];

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
        followed: data.is_following,
      };
    }

    fetchProfile(profileId, token, user).then((profile) => setProfile(profile));
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
      <UserCard profile={profile} user={user} token={token} />
      <div className="profile-posts-wrapper">
        <p>posts by {profile.username}</p>
        {posts && <PostList posts={userPosts} />}
      </div>
    </div>
  );
};

export default Profile;
