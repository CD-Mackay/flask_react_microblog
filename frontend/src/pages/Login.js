// Library Imports
import React from 'react';

// Component Imports
import LoginForm from '../Components/LoginForm/LoginForm';

const Login = ({setUser}) => {
  return (
    <div className="App">
      <LoginForm  setUser={setUser} />
    </div>
  )
};

export default Login