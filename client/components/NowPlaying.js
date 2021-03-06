import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrentTrack } from "../store/spotifyTrack";
import { fetchUser } from "../store/spotifyUser";
import { fetchTrackInfo } from "../store/trackInfo";
import Playback from "./Playback";

class NowPlaying extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchTrack();
    this.props.fetchUser();
    this.props.fetchTrackInfo();
  }

  render() {
    // user stuff
    console.log("props", this.props.trackInfo);
    const userInfo = this.props.user.user;

    // track stuff
    //console.log("trackbar props", this.props.track.item);
    const item = this.props.track.item;
    if (!item || !userInfo) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    }
    const { album, artists } = this.props.track.item;
    // console.log("track", this.props.track);
    // console.log("artist", artists);
    // console.log("album", album);
    const imageSrc = album.images[0].url;
    const title = item.name;
    const albumTitle = album.name;
    const artist = artists[0].name;
    return (
      <div>
        <h2 id="now-playing-title">Now Playing:</h2>
        <div className="now-playing-container">
          <div>
            <img id="album-art" src={imageSrc} />
          </div>

          <div className="track-text">
            <p>{title}</p>
            <p>{albumTitle}</p>
            <p>{artist}</p>
          </div>
          {/* <Playback /> */}
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
    user: state.user,
    track: state.track,
    trackInfo: state.trackInfo,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTrack: () => dispatch(fetchCurrentTrack()),
    fetchUser: () => dispatch(fetchUser()),
    fetchTrackInfo: () => dispatch(fetchTrackInfo()),
  };
};

export default connect(mapState, mapDispatch)(NowPlaying);

{
  /* <div className="user-info">
          {/* <img src={displayImage} /> */
}
//   <h3>Logged-In as: {displayName}!</h3>
//   <a href={profileUrl}>
//     <h3>Your Profile...</h3>
//   </a>
// </div> */}
