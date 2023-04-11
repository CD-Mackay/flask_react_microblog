// Component Imports
import UseToken from "./Components/UseToken";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register";
import Footer from "./Components/Footer/Footer";
import GetUser from "./Components/GetUser";

//Library Imports
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Styling Imports
import "./App.css";
import Profile from "./Pages/Profile";

function App() {
  const { token, removeToken, saveToken } = UseToken();
  const { user } = GetUser();
  const [time, setTime] = useState(0);
  const [posts, setPosts] = useState("");
  const [userProfile, setUserProfile] = useState({
    username: "",
    id: 0,
    posts: [],
  });

  useEffect(() => {
    const getTime = async () => {
      try {
        const res = await fetch("/time");
        const data = await res.json();
        setTime(data.time);
      } catch (error) {
        console.log(error);
      }
    };
    const getPosts = async () => {
      try {
        const res = await fetch("/posts", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getTime();
    getPosts();
    const fetchUserProfile = async (user, token) => {
      if (!user) return;
      const res = await fetch(`/profile/${user}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      setUserProfile({
        username: data.username,
        id: data.id,
      });
    };

    fetchUserProfile(user, token);
  }, [token]);

  return (
    <BrowserRouter>
      <Header
        token={token}
        removeToken={removeToken}
        userProfile={userProfile}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              token={token}
              time={time}
              posts={posts}
              userProfile={userProfile}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login saveToken={saveToken} setUserProfile={setUserProfile} />
          }
        />
        <Route path="/register" element={<Register saveToken={saveToken} />} />
        <Route
          path="/user/:id"
          element={<Profile posts={posts} userProfile={userProfile} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
