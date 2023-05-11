//Library Imports
import React from "react";
import moment from 'moment';

// Styling Imports
import "./Header.css";

// Component Imports
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import GetUser from "../GetUser";
import UseToken from "../UseToken";

const Header = ({ userProfile }) => {
  const { removeUser, user } = GetUser();
  const { token, removeToken } = UseToken();

  const handleLogout = () => {
    removeToken();
    removeUser();
  };

  return (
    <nav className="header-nav">
      <div>
        {/* <p>Welcome {user && userProfile.username}!</p> */}
        <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
      </div>
      <div className="button-wrapper">
        {token && <Button onClick={handleLogout} message="Logout" />}
        {token && (
          <>
            <Link to={`/user/${user && user}`}>
              <Button message="Profile" />
            </Link>
            <Link to="/explore">
              <Button message="Explore" />
            </Link>
          </>
        )}
        {!token && (
          <>
            <Link to="/login">
              <Button message="Login" />
            </Link>
            <Link to="/register">
              <Button message="Register" />
            </Link>
          </>
        )}
        <Link to="/">
          <Button message="Home" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
