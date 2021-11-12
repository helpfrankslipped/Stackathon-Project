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
          data: {
            uris: `spotify:track:${spotifyId}`,
          },
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `bearer ${access_token}`,
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
    //console.log("treak", id);

    return (
      <li>
        <span className="suggested-track-info">
          <button id="add" onClick={() => addToPlaylist(id)}>
            +
          </button>
          <p>Track: {name}</p>
          <p>Album: {`${album.name}  `}</p>
          <p>Artist: {artists[0].name}</p>
        </span>
      </li>
    );
  }
}

export default SingleSuggestedTrack;
