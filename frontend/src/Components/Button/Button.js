//Library Imports
import React from "react";

// Styling Imports
import "./Button.css";

// Component Imports

const Button = ({ message }) => {
  return (
    <button className="button">{message}</button>
  );
};

export default Button;
