// Library Imports
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Component Imports
import UserCard from '../Components/UserCard/UserCard';
import PostList from '../Components/PostList/PostList';
import UseToken from '../Components/UseToken';

const Profile = ({posts, userProfile}) => {

  const { token } = UseToken()
  const location = useLocation()
  const profileId = Number(location.pathname.slice(6))
  const [profile, setProfile] = useState({
    username: "",
    id: "",
  });

  const showUserPosts = () => {
    let userPosts = posts
    .filter((post) => post.user_id === profileId)
    return <PostList posts={userPosts} />
  }

  useEffect(() => {
    fetch(`/profile/${profileId}`, {
      headers: {
        Authorization: "Bearer " + token,
      }
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
      <UserCard profile={profile} />
    </div>
  )
};

export default Profile