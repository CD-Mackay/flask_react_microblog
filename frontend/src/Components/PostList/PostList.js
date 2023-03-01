//Library Imports
import React from "react";
import PostListItem from "../PostListItem/PostListItem";

// Styling Imports
import "./PostList.css";

// Component Imports

const PostList = ({posts, dPosts}) => {
  console.log(posts)

  const showPosts = (array) => {
    array.map((element) => {
      return <PostListItem author={element.author} content={element.content} title={element.title} />
    })
  }
  return (
    <div>
      <p>{posts}</p>
      <p>{showPosts(dPosts)}</p>
    </div>
  );
};

export default PostList;