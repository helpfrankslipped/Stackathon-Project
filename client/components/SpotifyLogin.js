import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SpotifyLogin extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <a id="login" href="/auth/spotify">
          <h2>Click to log in with Spotify!</h2>
        </a>
      </div>
    );
  }
}

export default SpotifyLogin;
