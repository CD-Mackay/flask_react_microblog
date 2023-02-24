//Library Imports
import React from "react";

// Styling Imports
import "./PostList.css";

// Component Imports

const PostList = ({posts}) => {
  return (
    <div>
      <p>{posts}</p>
    </div>
  );
};

export default PostList;