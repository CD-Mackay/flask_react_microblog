//Library Imports
import React from "react";

// Styling Imports
import "./Layout.css";

// Component Imports
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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
