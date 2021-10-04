import axios from "axios";
import getToken from "../token";

const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";

const addTrack = (track) => {
  return { type: ADD_TO_PLAYLIST, track };
};

// const addToPlaylist = (spotifyId) => {
//   return async (dispatch) => {
//     const access_token = getToken();
//     const playlistId = "5KrDqmtEYJeQ47UsnbpdR4";
//     try {
//       const { data: newSong } = await axios.post(
//         `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
//         {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//             "Content-Type": "application/json",
//           },
//           params: {
//             uris: `spotify:track:${spotifyId}`,
//           },
//         }
//       );
//       dispatch(addTrack(newSong));
//     } catch (error) {
//       return `Error ${error.message} adding song`;
//     }
//   };
// };

const addToPlaylist = async (spotifyId) => {
  const access_token = getToken();
  const playlistId = "5KrDqmtEYJeQ47UsnbpdR4";
  try {
    const { data: newSong } = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        params: {
          uris: `spotify:track:${spotifyId}`,
        },
      }
    );
    console.log("newsong!!!!", newSong);
  } catch (error) {
    return `Error ${error.message} adding song`;
  }
};

// const add
export { addToPlaylist };
