import React, { Component } from "react";
import { connect } from "react-redux";

class SinglePlaylistTrack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { album, artists, name } = this.props.track;

    //const { name, artists } = this.props.track;
    //const key = this.props.key;
    return (
      <li>
        <span className="playlist-track-info">
          <p>{name}</p>
          {/* <p>By: {artists[0].name}</p> */}
        </span>
      </li>
    );
  }
}

export default SinglePlaylistTrack;
