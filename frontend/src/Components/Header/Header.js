//Library Imports
import React, { useEffect, useContext } from "react";

// Styling Imports
import "./Header.css";

// Component Imports
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import GetUser from "../GetUser";
import UseToken from "../UseToken";
import { UserContext } from "../../Contexts/UserContext";

const Header = () => {
  const { userProfile, fetchUserProfile } = useContext(UserContext);
  const { removeUser, user } = GetUser();
  const { token, removeToken } = UseToken();

  const handleLogout = () => {
    removeToken();
    removeUser();
  };


  useEffect(() => {
    fetchUserProfile(user, token);
  }, [user, token]);

  return (
    <nav className="header-nav">
      <div className="header-text">
        <p>Welcome {userProfile.username && userProfile.username}!</p>
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
