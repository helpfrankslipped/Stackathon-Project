import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/spotifyUser";
import { Link } from "react-router-dom";
import { fetchCurrentTrack } from "../store/spotifyTrack";
import { fetchTrackInfo } from "../store/trackInfo";

class Visuals extends Component {
  componentDidMount() {
    this.props.fetchUser();
    //console.log("user loaded");
    this.props.fetchTrack();
    //console.log("track mounted!");
    this.props.fetchTrackInfo();
    //console.log("info mounted");
  }

  render() {
    //console.log("User Props", this.props);
    const userInfo = this.props.user.user;
    if (!userInfo) {
      return (
        <div>
          <h3>loading...</h3>
        </div>
      );
    }
    const { displayName, photos, profileUrl } = this.props.user.user;
    const displayImage = photos[0].value;
    return (
      <div>
        <img src={displayImage} />
        <h1>Hello {displayName}!!</h1>
        <a href={profileUrl}>
          <h3>Your Profile...</h3>
        </a>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    track: state.track,
    trackInfo: state.trackInfo,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchTrack: () => dispatch(fetchCurrentTrack()),
    fetchTrackInfo: () => dispatch(fetchTrackInfo()),
  };
};

export default connect(mapState, mapDispatch)(Visuals);
