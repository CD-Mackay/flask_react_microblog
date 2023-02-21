//Library Imports
import React from "react";

// Styling Imports
import "./Header.css";

// Component Imports
import Header from "../Header/Header";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
