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
        <Link to="/auth/spotify">
          <h2>Click to log in with spotify!</h2>
        </Link>
      </div>
    );
  }
}

export default SpotifyLogin;
