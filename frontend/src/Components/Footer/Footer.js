//Library Imports
import React from "react";
import moment from "moment";

// Styling Imports
import "./Footer.css";

// Component Imports

const Footer = () => {
  return (
    <div className="footer">
      <p>{moment().format("MMMM Do YYYY, h:mm:ss a")}</p>
    </div>
  );
};

export default Footer;
