import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrentTrack } from "../store/spotifyTrack";

class TrackBar extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchTrack();
  }

  render() {
    console.log("trackbar props", this.props.track.item);
    const item = this.props.track.item;
    if (!item) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    }
    const { album, artists } = this.props.track.item;
    console.log("album", album);
    const imageSrc = album.images[0].url;
    const title = item.name;
    const albumTitle = album.name;
    const artist = artists[0].name;
    return (
      <div className="current-track-info">
        <h2>Now Playing:</h2>
        <img src={imageSrc} />
        <div className="track-text">
          <p>{title}</p>
          <p>{albumTitle}</p>
          <p>{artist}</p>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    track: state.track,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTrack: () => dispatch(fetchCurrentTrack()),
  };
};

export default connect(mapState, mapDispatch)(TrackBar);
