// Component Imports
import UseToken from "./Components/UseToken";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register";
import Footer from "./Components/Footer/Footer";

//Library Imports
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Styling Imports
import "./App.css";
import Profile from "./Pages/Profile";

function App() {
  const { token, removeToken, saveToken } = UseToken();
  const [time, setTime] = useState(0);
  const [posts, setPosts] = useState("");
  const [user, setUser] = useState({ // Add this to local storage 
    username: "",
    id: 0,
    posts: []
  });

  console.log(user);

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
      .then((data) => setPosts(data))
  }, [token]);

  return (
    <BrowserRouter>
      <Header token={token} removeToken={removeToken} user={user} />
      <Routes>
        <Route
          path="/"
          element={<Home token={token} time={time} posts={posts} user={user} />}
        />
        <Route path="/login" element={<Login saveToken={saveToken}  setUser={setUser} />} />
        <Route path="/register" element={<Register saveToken={saveToken} />} />
        <Route path="/user/:id" element={<Profile posts={posts} currentUser={user} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
