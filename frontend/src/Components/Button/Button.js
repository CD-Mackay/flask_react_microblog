//Library Imports
import React from "react";

// Styling Imports
import "./Button.css";

// Component Imports

const Button = ({ message, onClick }) => {
  return (
    <button onClick={onClick} className="button">{message}</button>
  );
};

export default Button;
