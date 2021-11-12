import React, { Component } from "react";
import { connect } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

import { fetchCurrentTrack } from "../store/spotifyTrack";
import { fetchUser } from "../store/spotifyUser";
import { fetchTrackInfo } from "../store/trackInfo";

function NowPlaying() {
  // componentDidMount() {
  //   this.props.fetchTrack();
  //   this.props.fetchUser();
  //   this.props.fetchTrackInfo();
  // }

  // render() {
  const theme = useTheme();

  // user stuff
  console.log("props", this.props.trackInfo);
  const userInfo = this.props.user.user;

  // track stuff
  //console.log("trackbar props", this.props.track.item);
  const item = this.props.track.item;
  if (!item || !userInfo) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }
  const { album, artists } = this.props.track.item;
  // console.log("track", this.props.track);
  // console.log("artist", artists);
  // console.log("album", album);
  const imageSrc = album.images[0].url;
  const title = item.name;
  const albumTitle = album.name;
  const artist = artists[0].name;
  return (
    // <div>
    //   <h2 id="now-playing-title">Now Playing:</h2>
    //   <div className="now-playing-container">
    //     <div>
    //       <img id="album-art" src={imageSrc} />
    //     </div>

    //     <div className="track-text">
    //       <p>{title}</p>
    //       <p>{albumTitle}</p>
    //       <p>{artist}</p>
    //     </div>
    //   </div>
    // </div>

    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {albumTitle}
          </Typography>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {artist}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={imageSrc}
        alt="Live from space album cover"
      />
    </Card>
  );
}
//}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    track: state.track,
    trackInfo: state.trackInfo,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTrack: () => dispatch(fetchCurrentTrack()),
    fetchUser: () => dispatch(fetchUser()),
    fetchTrackInfo: () => dispatch(fetchTrackInfo()),
  };
};

export default connect(mapState, mapDispatch)(NowPlaying);

{
  /* <div className="user-info">
          {/* <img src={displayImage} /> */
}
//   <h3>Logged-In as: {displayName}!</h3>
//   <a href={profileUrl}>
//     <h3>Your Profile...</h3>
//   </a>
// </div> */}
