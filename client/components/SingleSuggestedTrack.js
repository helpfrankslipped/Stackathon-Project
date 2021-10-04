import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import getToken from "../token";

class SingleSuggestedTrack extends Component {
  constructor(props) {
    super(props);
    this.addToPlaylist = this.addToPlaylist.bind(this);
  }

  async addToPlaylist(spotifyId) {
    console.log(spotifyId);
    const access_token = await getToken();
    const playlistId = "5KrDqmtEYJeQ47UsnbpdR4";
    try {
      const { data: newSong } = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          data: {
            uris: `spotify:track:${spotifyId}`,
          },
        }
      );
      console.log("newsong!!!!", newSong);
    } catch (error) {
      return `Error ${error.message} adding song`;
    }
  }

  render() {
    const { addToPlaylist } = this;
    const { name, album, artists, id } = this.props.track;
    console.log("treak", id);
    const key = this.props.key;
    return (
      <li key={key}>
        <span className="suggested-track-info">
          <button id="add" onClick={() => addToPlaylist(id)}>
            +
          </button>
          <p>{name}</p>
          <p>{album.name}</p>
          <p>{artists[0].name}</p>
        </span>
      </li>
    );
  }
}

export default SingleSuggestedTrack;
