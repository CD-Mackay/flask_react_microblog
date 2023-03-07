//Library Imports
import React, { useState } from "react";

// Styling Imports
import "./NewPost.css";

// Component Imports


const NewPost = () => {

  const [postForm, setPostForm] = useState({
    title: "",
    content: ""
  })

  const handleNewPost = (event) => {
    event.preventDefault()

  }


  function handleChange(event) {
    const { value, name } = event.target;
    setPostForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }
  return (
    <form className="new-post">
      <input onChange={handleChange} type="text" placeholder="Title" />
      <textarea onChange={handleChange} />
    </form>
  );
};

export default NewPost;
