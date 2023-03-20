// Library Imports
import React, { useState } from "react";

// Style Imports
import './ShowError.css'

// Component Imports

const ShowError = ({message}) => {
  const [error, setError] = useState("")

  const handleErrorChange = () => {
    setTimeout(() => {
      setError(message)
      return <p>{error}</p>
    }, 3000) 
    setTimeout(() => {
      setError("");
      return <p>{error}</p>
    }, 3000)
  }

  return (
    <div className="error">
      {handleErrorChange}
    </div>
  );
};

export default ShowError;
