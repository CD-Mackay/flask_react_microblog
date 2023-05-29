//Library Imports
import React from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import UseToken from "../UseToken";

// Styling Imports
import "./PostListItem.css";

// Component Imports
import { Link } from "react-router-dom";

const PostListItem = ({ user_id, content, title, author, postId, score }) => {
  const { token } = UseToken();

  const handleVote = async (id, score) => {
    console.log("voting!", score === 1 ? "up" : "down");
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        postId: id,
        score: score,
      }),
    };
    fetch("/vote", requestOptions)
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        return data;
      });
  };
  return (
    <div className="post-item" data-testid="post-item">
      <div className="title-card">
        <h4 className="post-title">{title}</h4>
        <Link to={`/user/${user_id}`} className="post-link">
          {author}
        </Link>
      </div>
      <p>{content}</p>
      <div className="vote-buttons">
        <FaArrowCircleDown onClick={() => handleVote(postId, -1)} />
        <span>{score}</span>
        <FaArrowCircleUp onClick={() => handleVote(postId, 1)} />
      </div>
    </div>
  );
};

export default PostListItem;
