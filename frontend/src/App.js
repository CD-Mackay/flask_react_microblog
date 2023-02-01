import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import LoginForm from "./Components/LoginForm";
import UseToken from "./Components/UseToken";
import Header from "./Components/Header/Header";

function App() {
  const { token, removeToken, saveToken } = UseToken();
  const [time, setTime] = useState(0);
  const [posts, setPosts] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => setTime(data.time));
    fetch("/posts", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data.content));
  }, []);

  return (
    <div className="App">
      <Header token={token} setShowLogin={setShowLogin} removeToken={removeToken} />
      <img src={logo} className="App-logo" alt="logo" />
      <p>{time}</p>
      {token && token !== "" && token !== undefined && token !== null && (
        <p>{posts}</p>
      )}
      {!showLogin && <button onClick={() => setShowLogin(true)}>Login?</button>}
      {showLogin && !token && <LoginForm saveToken={saveToken} />}
    </div>
  );
}

export default App;
