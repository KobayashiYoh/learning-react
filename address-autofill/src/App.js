import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [address, setAddress] = useState('');

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  }

  const handleSubmit = (e) => {
    console.log(address);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {address}
          <input type="text" value={address} onChange={handleChangeAddress} />
          <button onClick={handleSubmit} >Submit</button>
        </div>
      </header>
    </div>
  );
}

export default App;
