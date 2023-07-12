//Library Imports
import React, { useState } from "react";
import PostListItem from "../PostListItem/PostListItem";

// Styling Imports
import "./PostList.css";

// Component Imports
import UseToken from "../UseToken";

const PostList = ({ posts }) => {
  const [orderBy, setOrderBy] = useState("new");

  const token = UseToken()

  console.log(token)

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

  const handleChangeSort = (e) => {
    if (e.target.value === "0") {
      return;
    } else {
      setOrderBy(e.target.value);
    }
  };

  return (
    <div className="post-list">
      {(posts && !posts.msg)&& (
        <>
          {token.token && <select id="orderBy" onChange={(e) => handleChangeSort(e)}>
            <option value="0">Sort by</option>
            <option value="new">new</option>
            <option value="hot">hot</option>
            <option value="controverial">controversial</option>
          </select>}
          <div>{showPosts()}</div>
        </>
      )}
    </div>
  );
};

export default PostList;
