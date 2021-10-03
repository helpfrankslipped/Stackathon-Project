import axios from "axios";
import getToken from "../token";

const GET_TRACK_INFO = "GET_TRACK_INFO";

const getTrackInfo = (trackInfo) => {
  return {
    type: GET_TRACK_INFO,
    trackInfo,
  };
};

const fetchTrackInfo = () => {
  return async (dispatch) => {
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
      //console.log("track info", currentTrack);

      const { data: trackInfo } = await axios.get(
        `https://api.spotify.com/v1/audio-analysis/${currentTrack.item.id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      //console.log("info!!!", trackInfo);
      dispatch(getTrackInfo(trackInfo));
    } catch (error) {
      return `Error ${error.message} fetch info issue`;
    }
  };
};

const trackInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TRACK_INFO:
      return action.trackInfo;
    default:
      return state;
  }
};

export { fetchTrackInfo };
export default trackInfoReducer;
