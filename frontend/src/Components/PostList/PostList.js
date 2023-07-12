//Library Imports
import React, { useState } from "react";
import PostListItem from "../PostListItem/PostListItem";

// Styling Imports
import "./PostList.css";

// Component Imports

const PostList = ({ posts }) => {
  const [orderBy, setOrderBy] = useState("new");

  const showPosts = () => {
    orderBy === "new"
      ? posts.sort((a, b) => b.id - a.id)
      : orderBy === "hot"
      ? posts.sort(
          (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
        )
      : posts.sort(
          (a, b) => b.upvotes + b.downvotes - (a.upvotes + a.downvotes)
        );

    return posts.map((element, index) => {
      return (
        <PostListItem
          postId={element.id}
          author={element.author}
          user_id={element.user_id}
          content={element.content}
          title={element.title}
          upvotes={element.upvotes}
          downvotes={element.downvotes}
          key={index}
        />
      );
    });
  };

  return (
    <div className="post-list">
      {posts && !posts.msg && (
        <select id="orderBy" onChange={(e) => setOrderBy(e.target.value)}>
          <option value="new">new</option>
          <option value="hot">hot</option>
          <option value="controverial">controversial</option>
        </select>
      )}
      {posts && !posts.msg && <div>{showPosts()}</div>}
    </div>
  );
};

export default PostList;
