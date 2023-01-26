import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from 'react'


function App() {

  const [time, setTime] = useState(0)

  useEffect(() =>{
    fetch('/time').then(res => res.json()).then(data => 
      setTime(data.time)
    )
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {time}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
