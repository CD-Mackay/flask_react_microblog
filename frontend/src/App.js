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
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

//Styling Imports
import "./App.css";
import Profile from "./Pages/Profile";

function App() {
  const { token, saveToken } = UseToken();
  const { user } = GetUser();
  const [time, setTime] = useState(0);
  // const [posts, setPosts] = useState("");
  // const [followedPosts, setFollowedPosts] = useState("");
  const [userProfile, setUserProfile] = useState({
    username: "",
    id: 0,
    posts: [],
  });

  const fetchUserProfile = async (user, token) => {
    if (!user) return;
    const res = await fetch(`/profile/${user}/${user}`, {
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
    // const getPosts = async () => {
    //   try {
    //     const res = await fetch("/posts", {
    //       headers: {
    //         Authorization: "Bearer " + token,
    //       },
    //     });
    //     const data = await res.json();
    //     setPosts(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // const getFollowedPosts = async () => {
    //   try {
    //     const res = await fetch(`/followed_posts/${user}`, {
    //       headers: {
    //         Authorization: "Bearer " + token,
    //       },
    //     });
    //     const data = await res.json();
    //     setFollowedPosts(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    getTime();
    // getPosts();
    // getFollowedPosts();

    fetchUserProfile(user, token);
    console.log("rendering!!"); // How to make posts appear on first load after login
  }, [token, user]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home time={time} userProfile={userProfile} />}
        />
        <Route
          path="/explore"
          element={<Explore time={time} userProfile={userProfile} />}
        />
        <Route
          path="/login"
          element={
            <Login saveToken={saveToken} fetchUserProfile={fetchUserProfile} />
          }
        />
        <Route path="/register" element={<Register saveToken={saveToken} />} />
        <Route path="/user/:id" element={<Profile 
        // posts={posts}
         />} />
      </Routes>
    </>
  );
}

export default App;
