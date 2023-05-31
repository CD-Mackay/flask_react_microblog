// Component Imports
import UseToken from "./Components/UseToken";
import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register";
import Explore from "./Pages/Explore";
import GetUser from "./Components/GetUser";

//Library Imports
import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";

//Styling Imports
import "./App.css";
import Profile from "./Pages/Profile";
import { UserContext } from "./Contexts/UserContext";

function App() {
  const { token, saveToken } = UseToken();
  const { user } = GetUser();

  const { fetchUserProfile, getVotes, userProfile } = useContext(UserContext);



  useEffect(() => {
    fetchUserProfile(user, token); 
    getVotes(token)
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login saveToken={saveToken} />} />
        <Route path="/register" element={<Register saveToken={saveToken} />} />
        <Route path="/user/:id" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
