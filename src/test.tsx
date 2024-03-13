import './App.css';
import Card from './components/Card';
import { useState, useEffect } from 'react';
import albums from './utils/albums';

const App = () => {
    const [index, setIndex] = useState(0);
    const [artistGuess, setArtistGuess] = useState('');
    const [albumGuess, setAlbumGuess] = useState('');
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [hasGuessed, setHasGuessed] = useState(false);
    const [isArtistGuessCorrect, setIsArtistGuessCorrect] = useState('');
    const [isAlbumGuessCorrect, setIsAlbumGuessCorrect] = useState('');

    const { album: currentAlbum, name: currentArtist } = albums[index];

    useEffect(() => {
        // Resets state upon navigating
        setHasGuessed(false);
        setIsAlbumGuessCorrect('');
        setIsArtistGuessCorrect('');
        setAlbumGuess('');
        setArtistGuess('');
    }, [index]);

    useEffect(() => {
        localStorage.setItem('highScore', highScore);
    }, [highScore]);

    const moveIndex = (delta) => {
        setIndex((prevIndex) => {
            const newIndex = Math.min(Math.max(prevIndex + delta, 0), albums.length - 1);
            return newIndex;
        });
    };

    const normalizeString = (str) => {
        return str.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();
    };

    const containsKeywords = (userInput, correctAnswer) => {
        const userTokens = normalizeString(userInput).split(' ');
        const answerTokens = normalizeString(correctAnswer).split(' ');
        return userTokens.every((token) => answerTokens.includes(token));
    };

    const checkAnswer = () => {
        setHasGuessed(true);
        const artistResult = normalizeString(artistGuess) === normalizeString(currentArtist) || containsKeywords(artistGuess, currentArtist) ? 'Yes' : 'No';
        const albumResult = normalizeString(albumGuess) === normalizeString(currentAlbum) || containsKeywords(albumGuess, currentAlbum) ? 'Yes' : 'No';

        setIsArtistGuessCorrect(artistResult);
        setIsAlbumGuessCorrect(albumResult);

        if (artistResult === 'Yes' || albumResult === 'Yes') {
            const newScore = currentScore + 1;
            setCurrentScore(newScore);
            setHighScore(Math.max(newScore, highScore));
        } else {
            setCurrentScore(0);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    };

    return (
        <div className='App'>
            <div>
                <h1>Album Covers</h1>
                <h2>How well do you know your music?</h2>
                <h3>Streak: {currentScore} </h3> <h3>High score: {highScore}</h3>

                <Card isFlipped={isFlipped} onClick={() => !hasGuessed ? alert('Please enter your guess!') : setIsFlipped(f => !f)} album={currentAlbum} artist={currentArtist} />

                <div>
                    <input className={isArtistGuessCorrect} type="text" id="guess-artist-textbox" placeholder={'Guess the artist'} value={artistGuess} onChange={(e) => setArtistGuess(e.target.value)} onKeyDown={handleKeyDown} />
                    <br />
                    <input className={isAlbumGuessCorrect} type="text" id="guess-album-textbox" placeholder={'Guess the album'} value={albumGuess} onChange={(e) => setAlbumGuess(e.target.value)} onKeyDown={handleKeyDown} />

                </div>
                <button onClick={checkAnswer}>Answer</button>
            </div>
            <div className="nav-buttons">
                <button disabled={!index} onClick={() => moveIndex(-1)}>⏮</button>
                <button disabled={index === albums.length - 1} onClick={() => moveIndex(1)}>⏭</button>
            </div>
        </div>
    );
};

export default App;


return (
    <div className='App'>
      <h1>Album Covers</h1>
      <h2>How well do you know your music?</h2>
      <h3>Streak: {currentScore} </h3> <h3>High score: {highScore}</h3>

      <Card isFlipped={isFlipped} onClick={() => !hasGuessed ? alert('Please enter your guess!') : setIsFlipped(f => !f)} album={currentAlbum} artist={currentArtist} />

      <div>
        <input className={isArtistGuessCorrect} type="text" id="guess-artist-textbox" placeholder={'Guess the artist'} value={artistGuess} onChange={(e) => setArtistGuess(e.target.value)} onKeyDown={handleKeyDown} />
      </div>
      <div>
        <input className={isAlbumGuessCorrect} type="text" id="guess-album-textbox" placeholder={'Guess the album'} value={albumGuess} onChange={(e) => setAlbumGuess(e.target.value)} onKeyDown={handleKeyDown} />
      </div>
      <button onClick={checkAnswer}>Answer</button>

      <div className="nav-buttons">
        <button disabled={!index} onClick={() => moveIndex(-1)}>⏮</button>
        <button disabled={index === albums.length - 1} onClick={() => moveIndex(1)}>⏭</button>
      </div>
    </div>
  );