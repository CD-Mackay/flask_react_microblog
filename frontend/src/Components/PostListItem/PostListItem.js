//Library Imports
import React from "react";

// Styling Imports
import "./PostListItem.css";

// Component Imports

const PostListItem = ({ author, content, title }) => {
  return (
    <div className="post-item">
      <div className="title-card">
        <h6>{title}</h6>
        <h6>{author}</h6>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default PostListItem;
