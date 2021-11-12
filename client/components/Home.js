import React from "react";
import { connect } from "react-redux";
import Suggestions from "./Suggestions";
import NowPlaying from "./NowPlaying";
import PlayListBar from "./PlayListBar";
import Filters from "./Filters";
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div className="whole-page">
      <div id="sidebars">
        <PlayListBar />
        <Filters />
      </div>
      <div className="center-page">
        <NowPlaying />
      </div>
      <div className="suggestions-container">
        <Suggestions />
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
