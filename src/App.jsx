import './App.css';
import Card from './components/Card'
import { useState } from 'react';
import albums from './utils/albums';
console.log(albums);
const N = albums.length;

const App = () => {

  const [index, setIndex] = useState(0);

  const moveBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  const moveForward = () => {
    if (index < N - 1) {
      setIndex(index + 1);
    }
  }

  const [isFlipped, setFlippedState] = useState(false);

  const flipCard = () => {
    setFlippedState(!isFlipped)
  }

  return (
    <div className='App'>
      <div>
        <h1>Album Covers</h1>
        <h2>How well do you know your music?</h2>
        <Card isFlipped={isFlipped} onClick={flipCard} album={albums[index].album} artist={albums[index].name} />
      </div>
      <div className="buttons">
        <button onClick={moveBack}>⏮</button>
        <button onClick={moveForward}>⏭</button>
      </div>
    </div>
  )
}

export default App
