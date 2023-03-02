//Library Imports
import React from "react";

// Styling Imports
import "./PostListItem.css";

// Component Imports
import { Link } from 'react-router-dom'

const PostListItem = ({ author, content, title }) => {
  return (
    <div className="post-item">
      <div className="title-card">
        <h6>{title}</h6>
        <Link to="/user">
          <h6>{author}</h6>
        </Link>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default PostListItem;
