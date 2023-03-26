import './App.css';
import React, { useState } from 'react';
import sound from './cat.mp3';

function App() {
  const [count, setCount] = useState(0);

  const handlePlay = (e) => {
    setCount(count + 1);
    console.log("play");
    const audio = new Audio(sound);
    audio.play();
  }

  return (
    <div className="App">
      <header className="App-header">
        {(() => {
          const d = [];
          for (let i = 0; i < count; i++) {
            d.push("🐈");
          }
          return d;
        })()}
        <button onClick={handlePlay}>＋🐈</button>
      </header>
    </div>
  );
}

export default App;
