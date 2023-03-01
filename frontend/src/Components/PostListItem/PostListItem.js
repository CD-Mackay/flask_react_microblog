//Library Imports
import React from "react";

// Styling Imports
import "./PostListItem.css";

// Component Imports

const PostListItem = ({author, content, title}) => {
  return (
    <div>
      <h6>{title}</h6>
      <p>{content}</p>
      <p>{author}</p>
    </div>
  );
};

export default PostListItem;