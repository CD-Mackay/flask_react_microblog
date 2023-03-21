//Library Imports
import React from "react";

// Styling Imports
import "./Layout.css";

// Component Imports

const Layout = (props) => {
  return (
    <>
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
