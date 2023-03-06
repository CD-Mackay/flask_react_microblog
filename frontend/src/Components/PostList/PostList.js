//Library Imports
import React from "react";
import PostListItem from "../PostListItem/PostListItem";

// Styling Imports
import "./PostList.css";

// Component Imports

const PostList = ({ posts }) => {
  console.log(posts);
  console.log(Array.isArray(posts));

  const showPosts = () => {
    return posts.map((element) => {
      return (
        <PostListItem
          author={element.author}
          content={element.content}
          title={element.title}
        />
      );
    });
  };

  return (
    <div>
      {posts && <div>{showPosts()}</div>}
    </div>
  );
};

export default PostList;
