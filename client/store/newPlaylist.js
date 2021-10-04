import axios from "axios";
import getToken from "../token";

const GET_PLAYLIST = "GET_PLAYLIST";
const ADD_TRACK = "ADD_TRACK";

const getPlaylist = (playlist) => {
  return {
    type: GET_PLAYLIST,
    playlist,
  };
};

const addNewTrack = (track) => {
  return {
    type: ADD_TRACK,
    track,
  };
};

// thunk
// helper function to return current track;
const returnCurrentTrack = async () => {
  const access_token = await getToken();
  //console.log("access token get track", access_token);
  try {
    const { data: currentTrack } = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        params: {
          market: "US",
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return currentTrack;
  } catch (error) {
    return `Error ${error.message} returnCurrentTrack`;
  }
};
