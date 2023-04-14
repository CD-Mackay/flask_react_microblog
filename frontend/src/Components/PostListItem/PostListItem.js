//Library Imports
import React from "react";

// Styling Imports
import "./PostListItem.css";

// Component Imports
import { Link } from 'react-router-dom'

const PostListItem = ({ user_id, content, title, author }) => {
  return (
    <div className="post-item">
      <div className="title-card">
        <h6>{title}</h6>
        <Link to={`/user/${user_id}`}>
          <p>{author}</p>
        </Link>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default PostListItem;
