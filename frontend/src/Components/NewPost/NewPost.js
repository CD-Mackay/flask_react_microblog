//Library Imports
import React, { useState } from "react";

// Styling Imports
import "./NewPost.css";

// Component Imports
import Button from "../Button/Button";
import UseToken from "../UseToken";

const NewPost = () => {
  const { token } = UseToken()
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
  });

  const handleNewPost = (event) => {
    event.preventDefault()
    if (!token) {
      return console.log("you must be logged in to post")
    }
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: postForm.title,
        content: postForm.content,
        // Still need some way to attach user id
      }),
    };
    fetch("/newpost", requestOptions) // Backend routing not completed yet
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return console.log(error);
      });

    setPostForm({
      title: "",
      content: "",
    });
  };

  function handleChange(event) {
    const { value, name } = event.target;
    setPostForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }
  return (
    <form className="new-post">
      <input
        onChange={handleChange}
        type="text"
        text={postForm.title}
        value={postForm.title}
        placeholder="Title"
      />
      <textarea
        onChange={handleChange}
        text={postForm.content}
        value={postForm.content}
        placeholder="Write some stuff in here..."
      />
      <Button onClick={handleNewPost} message="Make the post!" />
    </form>
  );
};

export default NewPost;
