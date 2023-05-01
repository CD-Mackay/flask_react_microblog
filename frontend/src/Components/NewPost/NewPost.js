//Library Imports
import React, { useState } from "react";

// Styling Imports
import "./NewPost.css";

// Component Imports
import Button from "../Button/Button";
import UseToken from "../UseToken";
import ShowError from "../ShowError/ShowError";

const NewPost = ({ user }) => {
  console.log(user);
  const { token } = UseToken();
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewPost = (event) => {
    event.preventDefault();
    if (!token) {
      setErrorMessage("You must be logged in to post");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: postForm.title,
        content: postForm.content,
        id: user.id,
      }),
    };
    fetch("/new", requestOptions)
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        return data;
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
        name="title"
      />
      <textarea
        onChange={handleChange}
        text={postForm.content}
        value={postForm.content}
        placeholder="Write some stuff in here..."
        name="content"
      />
      <div className="button-wrapper">
        <Button onClick={handleNewPost} message="Post!" />
      </div>
      <ShowError message={errorMessage} />
    </form>
  );
};

export default NewPost;
