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
    console.log("TOKEN!", access_token);
    try {
      const { data: trackSuggestions } = await axios.get(
        "https://api.spotify.com/v1/recommendations",
        {
          params: {
            limit: 10,
            seed_artists: currentTrack.item.artists[0].id,
            seed_genres: "techno, house",
            seed_tracks: currentTrack.item.id,
            min_tempo: 140,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      dispatch(getTrackSuggestions(trackSuggestions));
    } catch (error) {
      console.log("oh no");
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
