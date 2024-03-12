import './App.css';
import Card from './components/Card'
import { useState, useEffect } from 'react';
import albums from './utils/albums';

const App = () => {
  const [hasGuessed, setHasGuessed] = useState(false);
  const [isFlipped, setFlippedState] = useState(false);
  const [index, setIndex] = useState(0);
  const [artistGuess, setArtistGuess] = useState('');
  const [albumGuess, setAlbumGuess] = useState('');

  // Derived states are calculated directly from the primary state 'index'
  const currentAlbum = albums[index].album;
  const currentArtist = albums[index].name;
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(index < albums.length - 1);

  const [isAlbumGuessCorrect, setIsAlbumGuessCorrect] = useState('');
  const [isArtistGuessCorrect, setIsArtistGuessCorrect] = useState('');

  useEffect(() => {
    // Ensures 'canGoBack' and 'canGoForward' are updated whenever 'index' changes.
    setCanGoBack(index > 0);
    setCanGoForward(index < albums.length - 1);

    // Resets guess flag and text fields upon navigating.
    setHasGuessed(false);
    setIsAlbumGuessCorrect('');
    setIsArtistGuessCorrect('');
    // Resets guess input fields.
    setAlbumGuess('');
    setArtistGuess('');

  }, [index]);

  const moveBack = () => {
    setIndex(idx => Math.max(idx - 1, 0));
  }

  const moveForward = () => {
    setIndex(idx => Math.min(idx + 1, albums.length - 1));
  }

  const flipCard = () => {
    if (hasGuessed) {
      setFlippedState(flipped => !flipped);
    } else {
      alert('Please enter your best guess before flipping the card. Otherwise, request a hint');
    }
  }

  const checkAnswer = () => {
    setHasGuessed(true);
    setIsAlbumGuessCorrect(currentAlbum === albumGuess ? 'Yes' : 'No');
    setIsArtistGuessCorrect(currentArtist === artistGuess ? 'Yes' : 'No');
  }

  return (
    <div className='App'>
      <div>
        <h1>Album Covers</h1>
        <h2>How well do you know your music?</h2>
        <h3>Streak: </h3> <h3>High score:</h3>

        <Card isFlipped={isFlipped} onClick={flipCard} album={currentAlbum} artist={currentArtist} />

        <div>
          <input className={isArtistGuessCorrect} type="text" id="guess-artist-textbox"
            placeholder={'Guess the artist'} value={artistGuess}
            onChange={(e) => setArtistGuess(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { checkAnswer() } }}
          />
          <br />
          <input className={isAlbumGuessCorrect} type="text" id="guess-album-textbox"
            placeholder={'Guess the album'} value={albumGuess}
            onChange={(e) => setAlbumGuess(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { checkAnswer() } }}
          />
        </div>
        <button onClick={checkAnswer}>Answer</button>
      </div>

      <div className="nav-buttons">
        <button disabled={!canGoBack} onClick={moveBack}>⏮</button>
        <button disabled={!canGoForward} onClick={moveForward}>⏭</button>
      </div>

    </div>
  )
}

export default App;