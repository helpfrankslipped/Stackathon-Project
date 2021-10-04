import React, { Component } from "react";
import getToken from "../token";
import axios from "axios";

class Playback extends Component {
  constructor() {
    super();
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  async play() {
    try {
      const access_token = await getToken();
      await axios.put("https://api.spotify.com/v1/me/player/play", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (error) {
      return `Play Error`;
    }
  }

  async pause() {
    try {
      const access_token = await getToken();
      await axios.put("https://api.spotify.com/v1/me/player/pause", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("paused");
    } catch (error) {
      return `Pause Error`;
    }
  }

  render() {
    const { play, pause } = this;
    return (
      <div className="player-controls">
        <button id="play" onClick={() => play()}>
          Play
        </button>
        <button id="pause" onClick={() => pause()}>
          Pause
        </button>
      </div>
    );
  }
}

export default Playback;
