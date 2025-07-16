import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import leaf from './assets/leaf.png'
import music from './assets/music.mp3'



function App() {
  //so first we are going to create a useState React Hook that'll be a string
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(60);


  const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/message');
        if (!response.ok){
          throw new Error ("Problem retrieving quote");
        }
        const json = await response.json();
        console.log(json)
        // setMessage(json.message);
        setMessage(json.message);
      } catch(error){
        console.error(error.message);
      }
    };

  // useEffect(() => {

  //   const timer = setInterval(() => {
  //     fetchData();
  //   }, 10000);
  //     fetchData();
  // }, []);

  const NewQuote = () => {
    //so we this function will render a new quote to the message state hook
    fetchData();
    setCountdown(60);
  };


  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      setCountdown(prevSeconds => {
        if (prevSeconds === 1){
          fetchData();  
          return 10;
        }
        return prevSeconds - 1;
      })
    }, 1000)
      return () => clearInterval(intervalId);
  }, []);  
  

  return (
    // so first
    <>
      <div>
        <h1 className='affirmation-title'>Positive Affirmations</h1>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <button className="cart-button" onClick={NewQuote}>New Quote!</button>
      </div>
      <div className="floating-leaves">
        <img src={leaf} className="leaf leaf1" alt="leaf"/>
        <img src={leaf} className="leaf leaf2" alt="leaf"/>
        <img src={leaf} className="leaf leaf3" alt="leaf"/>
      </div>
      <div className="glass-card">
        <p key={message} className="fade-in-text">{message}</p>
      </div>
      <h3 className='timer-glass'> New Quote In... {countdown} </h3>
      <audio src={music} autoPlay loop />
    </>
  )
}

export default App
