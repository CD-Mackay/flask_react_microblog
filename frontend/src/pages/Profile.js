// Library Imports
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

// Component Imports
import UserCard from "../Components/UserCard/UserCard";
import PostList from "../Components/PostList/PostList";
import UseToken from "../Components/UseToken";
import GetUser from "../Components/GetUser";
import Button from "../Components/Button/Button";
import ShowError from "../Components/ShowError/ShowError";
import { UserContext } from "../Contexts/UserContext";
const Profile = () => {
  const { token } = UseToken();
  const { user } = GetUser();
  const location = useLocation();
  const { userProfile, setUserProfile } = useContext(UserContext);
  const profileId = Number(location.pathname.slice(6));
  // State Declarations
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState({
    username: "",
    id: "",
    followed: null,
  });
  const [pageView, setPageView] = useState("profile"); // edit, password, username
  const [profileChange, setProfileChange] = useState("");
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
      setProfileChange("");
      const updated = {
        id: userProfile.id,
        username: newName,
        posts: userProfile.posts,
      };
      setUserProfile(updated);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async (user, newInfo, token) => {
    try {
      const res = await fetch(`/change_password/${user}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
            Accept: "application.json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newInfo
        })
      });
      const data = await res.json();
      console.log(data);
      setMessage(data.message);
      setProfileChange("");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

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
        {profile.id.toString() === user && pageView === "profile" && (
          <Button onClick={() => setPageView("edit")} message="Edit Profile" />
        )}
        {profile.id.toString() === user && pageView === "edit" && (
          <>
            <Button
              onClick={() => setPageView("password")}
              message="Change Password"
            />
            <Button
              onClick={() => setPageView("username")}
              message="Change Username"
            />
          </>
        )}
        {pageView === "username" && 
        <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          onChange={(e) => setProfileChange(e.target.value)}
          text={profileChange}
          name="profileChange"
          placeholder="try a new name?"
          value={profileChange}
        />
        <Button
          message={"Change username!"}
          onClick={() => changeUserName(user, profileChange, token)}
        />
      </form>
        }
        {pageView === "password" && 
        <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          onChange={(e) => setProfileChange(e.target.value)}
          text={profileChange}
          name="profileChange"
          placeholder="Change password?"
          value={profileChange}
        />
        <Button
          message={"Change Password!"}
          onClick={() => changePassword(user, profileChange, token)}
        />
      </form>
        }
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
