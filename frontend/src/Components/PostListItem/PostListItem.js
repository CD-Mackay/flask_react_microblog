//Library Imports
import React, { useContext } from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import UseToken from "../UseToken";

// Styling Imports
import "./PostListItem.css";

// Component Imports
import { Link } from "react-router-dom";
import GetUser from "../GetUser";
import { UserContext } from "../../Contexts/UserContext";

const PostListItem = ({ user_id, content, title, author, postId, score }) => {
  const { token } = UseToken();
  const { user } = GetUser();
  const { votes } = useContext(UserContext);

  const postVote = votes.filter((element) => element.post_id === postId);
  const postObj = postVote.length === 0 ? { upvote: null } : postVote[0];


  const handleVote = async (id, score) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        user_id: user,
      }),
    };
    fetch(`/vote/${id}/${score}`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        return data;
      });
  };

  const downIconStyle = { color: postObj.upvote === false ? "blue" : "gray" };
  const upIconStyle = { color: postObj.upvote === true ? "red" : "gray" };
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
        <FaArrowCircleDown
          style={downIconStyle}
          onClick={
            postObj.upvote === false
              ? () => console.log("you already downvoted")
              : () => handleVote(postId, -1)
          }
        />
        <span>{score}</span>
        <FaArrowCircleUp
          style={upIconStyle}
          onClick={
            postObj.upvote
              ? () => console.log("you already upvoted")
              : () => handleVote(postId, 1)
          }
        />
      </div>
    </div>
  );
};

export default PostListItem;
