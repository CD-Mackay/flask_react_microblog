// Library Imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Component Imports
import UserCard from "../Components/UserCard/UserCard";
import PostList from "../Components/PostList/PostList";
import UseToken from "../Components/UseToken";
import GetUser from "../Components/GetUser";
import Button from "../Components/Button/Button";
import ShowError from "../Components/ShowError/ShowError";
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
  const [nameChange, setNameChange] = useState("");
  const [message, setMessage] = useState("");

  const changeUserName = async (user, newName, token) => {
    try {
      const res = await fetch(`/change_username/${user}/${newName}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      setMessage(data.message);
      setNameChange("")
      setTimeout(() => {
        setMessage("")
      }, 2000)
    } catch(error) {
      console.log(error);
    }
    
  }

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
  }, [location]);

  return (
    <div className="App">
      <div className="card-wrapper">
        <UserCard profile={profile} user={user} token={token} />
        {profile.id == user && (
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              onChange={(e) => setNameChange(e.target.value)}
              text={nameChange}
              name="nameChange"
              placeholder="try a new name?"
              value={nameChange}
            />
            <Button
              message={"Change username!"}
              onClick={() => changeUserName(user, nameChange, token)}
            />
          </form>
        )}
        <ShowError message={message} />
      </div>
      <div className="profile-posts-wrapper">
        <p>posts by {profile.username}</p>
        {posts && <PostList posts={userPosts} />}
      </div>
    </div>
  );
};

export default Profile;
