import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

// Authenticate and get access token
async function getAccessToken() { 
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error(`Error getting access token: ${error.message}`);
    return null;
  }
}

// Search for albums by artist and retrieve cover images
async function fetchAlbumCover(artist, album) {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: `artist:${artist} album:${album}`,
        type: 'album'
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const albumInfo = response.data.albums.items[0];
    if (albumInfo && albumInfo.images.length > 0) {
      return albumInfo.images[0].url; // Use the first image as cover image
    } else {
      console.log(`Album cover not found for ${album} by ${artist}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching album cover for ${album} by ${artist}: ${error.message}`);
    return null;
  }
}

// // Example usage
// const artist = 'Kanye West';
// const album = 'The College Dropout';

// fetchAlbumCover(artist, album)
//   .then(coverUrl => {
//     console.log(`Album cover URL for ${album} by ${artist}: ${coverUrl}`);
//   });

export { fetchAlbumCover };