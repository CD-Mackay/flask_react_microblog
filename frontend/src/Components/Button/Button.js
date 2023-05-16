//Library Imports
import React from "react";

// Styling Imports
import "./Button.css";

// Component Imports

const Button = ({ message, onClick, disabled }) => {
  if (disabled) {
    return <button className="disabled-button">{message}</button>;
  }
  if (!disabled) {
    return (
      <button onClick={onClick} className="button">
        {message}
      </button>
    );
  }
};

export default Button;
