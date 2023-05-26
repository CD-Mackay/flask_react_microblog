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
          postId={element.id}
          author={element.author}
          user_id={element.user_id}
          content={element.content}
          title={element.title}
          key={index}
        />
      );
    });
  };

  return (
    <div className="post-list">
      {posts && !posts.msg && <div>{showPosts()}</div>}
    </div>
  );
};

export default PostList;
