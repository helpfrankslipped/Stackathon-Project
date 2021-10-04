import React, { Component } from "react";
import { connect } from "react-redux";
import { getNewPlaylist } from "../store/newPlaylist";
import SinglePlaylistTrack from "./SinglePlaylistTrack";

class PlayListBar extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchPlaylist();
  }

  render() {
    const playlistTracks = this.props.playlist.items;
    if (!playlistTracks) {
      return <div>loading...</div>;
    }
    return (
      <div className="playlist-container">
        <h3>Setlist:</h3>
        <ul>
          {playlistTracks.map((track) => {
            return (
              <SinglePlaylistTrack
                key={playlistTracks.indexOf(track)}
                track={track.track}
              />
            );
          })}
        </ul>
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

