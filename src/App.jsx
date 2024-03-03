import './App.css';
import { useState } from 'react';
// import samosa from './assets/samosa-image.png'

const App = () => {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(1);
  const updateCount = () => setCount(count + multiplier);
  const buyDoubleStuffed = () => {
    if (count > 10) {
      setCount(count - 10);
      setMultiplier(multiplier * 2);
    }
  }
  const buyPartyPack = () => {
    if (count > 100) {
      setCount(count - 100);
      setMultiplier(multiplier * 5);
    }
  }

  const buyFullFeast = () => {
    if (count > 1000) {
      setCount(count - 1000);
      setMultiplier(multiplier * 10);
    }
  }


  return (
    <div className='App'>
      <div className="header">
        <h1>Samosa Selector</h1>
        <h2>{'Counts: ' + count}</h2>
        <a onClick={updateCount}>
          <img className="samosa" src={samosa} alt="Samosa image" />
        </a>
      </div>
      <div className="container">
        <div className="upgrade">
          <h3>Doubl Stuffed 👯</h3>
          <p>2x per Click</p>
          <button onClick={buyDoubleStuffed}>10 samosas</button>
        </div>

        <div className="upgrade">
          <h3>Party Pack 🎉</h3>
          <p>5x per click</p>
          <button onClick={buyPartyPack}>100 samosas</button>
        </div>

        <div className="upgrade">
          <h3>Full Feast 👩🏾‍🍳</h3>
          <p>10x per click</p>
          <button onClick={buyFullFeast}>1000 samosas</button>
        </div>

      </div>
    </div>
  )
}

export default App
