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
    // Add this to local storage
    username: "",
    id: 0,
    posts: [],
  });

  console.log("user", user, "token", token) // Token persists but not user Id? 

  useEffect(() => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => setTime(data.time));
    fetch("/posts", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .catch((error) => console.log(error))
      .then((res) => res.json())
      .then((data) => setPosts(data));
    if (user) {
      fetch(`/profile/${user}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) =>
          setUserProfile({
            username: data.username,
            id: data.id,
          })
        );
    }
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
