// Library Imports
import React from 'react';
import { useLocation } from 'react-router-dom';

// Component Imports
import UserCard from '../Components/UserCard/UserCard';
import PostList from '../Components/PostList/PostList';

const Profile = ({posts}) => {

  const location = useLocation()
  const profileId = Number(location.pathname.slice(6))

  const showUserPosts = () => {
    let userPosts = posts
    .filter((post) => post.user_id === profileId)
    return <PostList posts={userPosts} />
  }
  return (
    <div className="App">
      <p>I am Profilepage</p>
      {posts && !posts.msg && showUserPosts()}
      <UserCard />
    </div>
  )
};

export default Profile