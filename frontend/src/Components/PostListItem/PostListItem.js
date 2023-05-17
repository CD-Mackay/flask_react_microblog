//Library Imports
import React from "react";

// Styling Imports
import "./PostListItem.css";

// Component Imports
import { Link } from 'react-router-dom'

const PostListItem = ({ user_id, content, title, author }) => {
  return (
    <div className="post-item" data-testid="post-item">
      <div className="title-card">
        <h4 className="post-title">{title}</h4>
        <Link to={`/user/${user_id}`} className="post-link">
          {author}
        </Link>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default PostListItem;
