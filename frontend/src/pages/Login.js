// Library Imports
import React from "react";

// Component Imports
import LoginForm from "../Components/LoginForm/LoginForm";

const Login = ({fetchUserProfile}) => {
  return (
    <div className="App">
      <LoginForm fetchUserProfile={fetchUserProfile} />
    </div>
  );
};

export default Login;
