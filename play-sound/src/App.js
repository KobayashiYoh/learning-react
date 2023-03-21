import './App.css';
import sound from './cat.mp3';

const handlePlay = (e) => {
  console.log("play");
  const audio = new Audio(sound);
  audio.play();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handlePlay}>🐈</button>
      </header>
    </div>
  );
}

export default App;
