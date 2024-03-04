import React, { useEffect, useState } from 'react';

const Card = ({ album, isFlipped, artist, onClick }) => { // Assuming artist is also a prop
  const [coverUrl, setCoverUrl] = useState('');

  // Assuming you want to uncomment and use this to fetch album cover
  // useEffect(() => {
  //   async function fetchAlbum() {
  //     const url = await fetchAlbumCover(artist, album); // Define this function or import it
  //     setCoverUrl(url);
  //   }
  //   fetchAlbum();
  // }, [artist, album]);

  // Assuming `img` needs to be a prop for cases where album cover isn't used
  const img = coverUrl || 'https://img.buzzfeed.com/buzzfeed-static/static/2021-09/14/0/campaign_images/aa2e00ac1046/26-photos-to-remember-the-legendary-tupac-shakur--2-2477-1631579881-17_dblbig.jpg?resize=1200:*';

  return (
    <div className="card" onClick={onClick}>
      <div className={`card-inner ${isFlipped ? 'isFlipped' : ''}`}>
        <div className="card-face front">
          <img src={img} alt="Artist Image" />
        </div>
        <div className="card-face back">
          <h3>{album || 'ALBUM'}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;