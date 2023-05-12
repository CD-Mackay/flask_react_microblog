// Component Imports
import UseToken from "./Components/UseToken";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register";
import Footer from "./Components/Footer/Footer";
import Explore from "./Pages/Explore";
import GetUser from "./Components/GetUser";

//Library Imports
import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";

//Styling Imports
import "./App.css";
import Profile from "./Pages/Profile";
import { UserContext } from "./Contexts/UserContext";

function App() {
  const { token, saveToken } = UseToken();
  const { user } = GetUser();
  const [time, setTime] = useState(0);

  const { userProfile, fetchUserProfile } = useContext(UserContext);

  // const [posts, setPosts] = useState("");
  // const [followedPosts, setFollowedPosts] = useState("");
  // const [userProfile, setUserProfile] = useState({
  //   username: "",
  //   id: 0,
  //   posts: [],
  // });

  // const fetchUserProfile = async (user, token) => {
  //   if (!user) return;
  //   const res = await fetch(`/profile/${user}/${user}`, {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  //   const data = await res.json();
  //   setUserProfile({
  //     username: data.username,
  //     id: data.id,
  //   });
  // };

  useEffect(() => {
    fetchUserProfile(user, token); // Put this into context?
  }, [token, user]);

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
