import axios from "axios";
import getToken from "../token";
import returnCurrentTrack from "./returnCurrentTrack";

const GET_TRACK_SUGGESTIONS = "GET_TRACK_SUGGESTIONS";

const getTrackSuggestions = (tracksObj) => {
  return {
    type: GET_TRACK_SUGGESTIONS,
    tracksObj,
  };
};

//thunk
const fetchTrackSuggestions = () => {
  return async (dispatch) => {
    const access_token = await getToken();
    const currentTrack = await returnCurrentTrack();
    try {
      const { data: trackSuggestions } = await axios.get(
        "https://api.spotify.com/v1/recommendations",
        {
          params: {
            limit: 10,
            seed_artists: currentTrack.item.artists[0].id,
            seed_genres: "rock",
            seed_tracks: currentTrack.item.id,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log("recs", trackSuggestions);
      dispatch(getTrackSuggestions(trackSuggestions));
    } catch (error) {
      return `Error ${error.message} suggestions thunk`;
    }
  };
};

const suggestionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TRACK_SUGGESTIONS:
      return action.tracksObj;
    default:
      return state;
  }
};

export { fetchTrackSuggestions };
export default suggestionReducer;
