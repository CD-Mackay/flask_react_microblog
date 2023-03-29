//Library Imports
import React from "react";
import PostListItem from "../PostListItem/PostListItem";

// Styling Imports
import "./PostList.css";

// Component Imports

const PostList = ({ posts }) => {
  const showPosts = () => {
    return posts.map((element, index) => {
      return (
        <PostListItem
          author={element.author}
          content={element.content}
          title={element.title}
          key={index}
        />
      );
    });
  };

  return <div>{posts && !posts.msg && <div>{showPosts()}</div>}</div>;
};

export default PostList;
