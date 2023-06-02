//Library Imports
import React, { useState } from "react";
import PostListItem from "../PostListItem/PostListItem";

// Styling Imports
import "./PostList.css";

// Component Imports

const PostList = ({ posts }) => {
  const [orderBy, setOrderBy] = useState("recent");

  const showPosts = () => {
    orderBy === "recent"
      ? posts.sort((a, b) => a.id - b.id)
      : posts.sort((a, b) => b.id - a.id);

    return posts.map((element, index) => {
      return (
        <PostListItem
          postId={element.id}
          author={element.author}
          user_id={element.user_id}
          content={element.content}
          title={element.title}
          score={element.upvotes - element.downvotes}
          key={index}
        />
      );
    });
  };

  return (
    <div className="post-list">
      <select id="orderBy" onChange={(e) => setOrderBy(e.target.value)}>
        <option value="new">new</option>
        <option value="hot">hot</option>
      </select>
      {posts && !posts.msg && <div>{showPosts()}</div>}
    </div>
  );
};

export default PostList;
