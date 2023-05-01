//Library Imports
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Styling Imports
import "./Layout.css";

// Component Imports

const Layout = (props) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
