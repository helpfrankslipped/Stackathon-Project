import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NowPlaying from "./NowPlaying";
import PlayListBar from "./PlayListBar";
import { fetchTrackSuggestions } from "../store/suggestions";
import SingleSuggestedTrack from "./SingleSuggestedTrack";

class Suggestions extends Component {
  componentDidMount() {
    this.props.fetchSuggestions();
  }

  render() {
    console.log("props suggestions", this.props.suggestions.tracks);
    const suggestionArr = this.props.suggestions.tracks;
    if (!suggestionArr) {
      return (
        <div>
          <h2>loading..</h2>
        </div>
      );
    }
    return (
      <div className="whole-page">
        <PlayListBar />
        <NowPlaying />
        <div className="Suggestions-container">
          <h1>Hello !!</h1>
          {suggestionArr.map((track) => {
            return (
              <ul>
                <SingleSuggestedTrack
                  key={suggestionArr.indexOf(track)}
                  track={track}
                />
              </ul>
            );
          })}
        </div>
      </div>
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
