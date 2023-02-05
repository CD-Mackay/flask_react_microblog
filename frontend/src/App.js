// Library Imports
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Component Imports
import UseToken from "./Components/UseToken";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";

// Style Imports
import "./App.css";



function App() {
  const { token, removeToken, saveToken } = UseToken();
  const [time, setTime] = useState(0);
  const [posts, setPosts] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    fetch("/time") // Fetches current time from API
      .then((res) => res.json())
      .then((data) => setTime(data.time));
    fetch("/posts", { // Protected route, accesses posts data for logged in users
      headers: {
        Authorization: "Bearer " + token
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data.content));
  }, []);

  return (
    <BrowserRouter>
       <Header
            token={token}
            setShowLogin={setShowLogin}
            removeToken={removeToken}
          />
      <Routes>
        <Route path="/" element={<Home token={token} showLogin={showLogin} time={time} posts={posts} />} />
        <Route path="/login" element={<Login saveToken={saveToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
