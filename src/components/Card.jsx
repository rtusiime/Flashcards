import React, { useEffect, useState } from 'react';
import { fetchAlbumCover } from '../utils/AlbumAPI';

const Card = ({ album, isFlipped, artist, onClick }) => { // Assuming artist is also a prop
  const [coverUrl, setCoverUrl] = useState('https://img.buzzfeed.com/buzzfeed-static/static/2021-09/14/0/campaign_images/aa2e00ac1046/26-photos-to-remember-the-legendary-tupac-shakur--2-2477-1631579881-17_dblbig.jpg?resize=1200:*');

  useEffect(() => {
    async function fetchAlbum() {
      const url = await fetchAlbumCover(artist, album);
      setCoverUrl(url);
    }
    fetchAlbum();
  }, [artist, album]);

  // Assuming `img` needs to be a prop for cases where album cover isn't used
  return (
    <div className={`card ${isFlipped ? 'isFlipped' : ''}`} onClick={onClick}>
      <div className={`card-face front ${isFlipped ? 'isFlipped' : ''}`}>
        <img src={coverUrl} alt="Artist Image" />
      </div>
      <div className={`card-face back ${isFlipped ? 'isFlipped' : ''}`}>
        <h3>{artist || 'ARTIST'}</h3>
        <h3>{album || 'ALBUM'}</h3>
      </div>
    </div>

  );
};

export default Card;