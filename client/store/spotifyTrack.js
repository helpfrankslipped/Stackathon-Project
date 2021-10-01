import axios from "axios";

const GET_CURRENT_TRACK = "GET_CURRENT_TRACK";

const getCurrentTrack = (track) => {
  return {
    type: GET_CURRENT_TRACK,
    track,
  };
};

// thunk
const fetchCurrentTrack = () => {
  return async (dispatch) => {
    try {
      const { data: currentTrack } = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            authorization: process.env.TOKEN,
          },
        }
      );
      console.log(currentTrack);
      dispatch(getCurrentTrack(currentTrack));
    } catch (error) {
      return `Error ${error.message} current track thunk`;
    }
  };
};

const trackReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_TRACK:
      return action.track;
    default:
      return state;
  }
};

export { fetchCurrentTrack };
export default trackReducer;
