import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from 'react'
import LoginForm from './Components/LoginForm';
import UseToken from './Components/UseToken';


function App() {

  const { token, removeToken, setToken } = UseToken();
  const [time, setTime] = useState(0)
  const [posts, setPosts] = useState("")

  useEffect(() =>{
    fetch('/time').then(res => res.json()).then(data => 
      setTime(data.time)
    )
    fetch('/posts').then(res => res.json()).then(data => 
      setPosts(data.content)
    )
    
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {time}
        </p>
        {!token && token!=="" &&token!== undefined && token !== null && 
          <p>{posts}</p>
          }
        <LoginForm />
      </header>
    </div>
  );
}

export default App;
