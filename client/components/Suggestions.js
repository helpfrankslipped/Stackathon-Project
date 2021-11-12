import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NowPlaying from "./NowPlaying";
import PlayListBar from "./PlayListBar";
import { fetchTrackSuggestions } from "../store/suggestions";
import SingleSuggestedTrack from "./SingleSuggestedTrack";
import Filters from "./Filters";

class Suggestions extends Component {
  componentDidMount() {
    this.props.fetchSuggestions();
  }

  render() {
    const suggestionArr = this.props.suggestions.tracks;
    console.log("suggest", suggestionArr);
    if (!suggestionArr) {
      return (
        <div>
          <h2>loading..</h2>
        </div>
      );
    }
    return (
      // <div className="whole-page">
      //   <PlayListBar />
      //   <Filters />
      //   <div className="center-page">
      //     <NowPlaying />
      <div className="suggestions-container">
        <h3>Suggested from Current Track:</h3>
        <ul>
          {suggestionArr.map((track) => {
            return (
              <li key={suggestionArr.indexOf(track)}>
                <SingleSuggestedTrack track={track} />
              </li>
            );
          })}
        </ul>
      </div>
      //   </div>
      // </div>
    );
  }
}

const mapState = (state) => {
  return {
    suggestions: state.suggestions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSuggestions: () => dispatch(fetchTrackSuggestions()),
  };
};

export default connect(mapState, mapDispatch)(Suggestions);
