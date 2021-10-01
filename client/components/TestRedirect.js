import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/spotifyUser";
import { Link } from "react-router-dom";

class TestRedirect extends Component {
  componentDidMount() {
    this.props.fetchUser();
    console.log("mounted!");
  }

  render() {
    console.log("user info", this.props.user.user);
    const userInfo = this.props.user.user;
    if (!userInfo) {
      return (
        <div>
          <h3>loading...</h3>
        </div>
      );
    }
    const { displayName, photos, profileUrl } = this.props.user.user;
    console.log("display", photos[0].value);
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapState, mapDispatch)(TestRedirect);
