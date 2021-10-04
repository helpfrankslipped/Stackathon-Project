import React, { Component } from "react";
import { connect } from "react-redux";

class SingleSuggestedTrack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, album, artists } = this.props.track;
    const key = this.props.key;
    return (
      <li key={key}>
        <span className="suggested-track-info">
          <button id="add">+</button>
          <p>{name}</p>
          <p>{album.name}</p>
          <p>{artists[0].name}</p>
        </span>
      </li>
    );
  }
}

export default SingleSuggestedTrack;
