import React, { Component } from "react";
import { connect } from "react-redux";
import { getNewPlaylist } from "../store/newPlaylist";

class PlayListBar extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchPlaylist();
  }

  render() {
    console.log("playlist props", this.props);
    const playlist = this.props.playlist;
    console.log(playlist.items);
    return (
      <div className="playlist-container">
        <h3>Current Setlist</h3>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    playlist: state.playlist,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPlaylist: () => dispatch(getNewPlaylist()),
  };
};

export default connect(mapState, mapDispatch)(PlayListBar);
