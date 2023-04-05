// Library Imports
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Component Imports
import UserCard from '../Components/UserCard/UserCard';
import PostList from '../Components/PostList/PostList';
import UseToken from '../Components/UseToken';

const Profile = ({posts, currentUser}) => {

  const { token } = UseToken()
  const location = useLocation()
  const profileId = Number(location.pathname.slice(6))
  const [profile, setProfile] = useState({
    username: "",
    id: ""
  });

  const showUserPosts = () => {
    let userPosts = posts
    .filter((post) => post.user_id === profileId)
    return <PostList posts={userPosts} />
  }

  useEffect(() => {
    fetch("/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: profileId
      }),
    })
      .then((res) => res.json())
      .then((data) => setProfile({
        username: data.username,
        id:data.id
      }));

  }, [])
  return (
    <div className="App">
      <p>I am Profilepage</p>
      {posts && !posts.msg && showUserPosts()}
      <UserCard username={profile.username} currentUser={currentUser} />
    </div>
  )
};

export default Profile