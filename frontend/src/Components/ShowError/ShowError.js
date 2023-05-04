// Library Imports
import React from "react";

// Style Imports
import "./ShowError.css";

// Component Imports

const ShowError = ({ message }) => {


  return (
    <div className="error" data-testid="error">
      <p>{message}</p>
    </div>
  );
};

export default ShowError;
