import axios from "axios";
import getToken, { getUserId } from "../token";

const GET_PLAYLIST = "GET_PLAYLIST";
const CREATE_PLAYLIST = "CREATE_PLAYLIST";

const getPlaylist = (playlist) => {
  return {
    type: GET_PLAYLIST,
    playlist,
  };
};

const createPlaylist = (playlistObj) => {
  return {
    type: CREATE_PLAYLIST,
    playlistObj,
  };
};

// thunk
const getNewPlaylist = () => {
  return async (dispatch) => {
    const access_token = await getToken();
    const playlistId = "1yy3mVwhTfkzj5sUxvjjLA";
    try {
      const { data: userPlaylist } = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      dispatch(getPlaylist(userPlaylist));
    } catch (error) {
      return `Error ${error.message} GET playlist`;
    }
  };
};

const createNewPlaylist = () => {
  return async (dispatch) => {
    const access_token = getToken();
    const userId = getUserId();
    try {
      const { data: newPlaylist } = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          name: "Setlist",
        }
      );
      console.log("new playlist", newPlaylist);
      dispatch(createPlaylist(newPlaylist));
    } catch (error) {
      return `Error ${error.message} create playlist`;
    }
  };
};

const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PLAYLIST:
      return action.playlist;
    case CREATE_PLAYLIST:
      return action.playlistObj;
    default:
      return state;
  }
};

export { createNewPlaylist, getNewPlaylist };
export default playlistReducer;

//https://open.spotify.com/playlist/1yy3mVwhTfkzj5sUxvjjLA?si=41429e4526d54ba8
