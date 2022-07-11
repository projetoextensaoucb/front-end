import React, { Component } from "react";
import ReactImageMagnify from "react-image-magnify";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  root: {}
});

class MyReactImageMagnify extends Component {
  render() {
    return (
      <ReactImageMagnify
        {...{
          smallImage: {
            isFluidWidth: false,
            showThumbnails: false,
            useBrowserFullscreen: false,
            showPlayButton: false,
            showFullscreenButton: false,
            src: "static/images/catolica/biblioteca-digital.png",
            width: 1818,
            height: 658.08
          },
          largeImage: {
            src: "static/images/catolica/biblioteca-digital.png",
            width: 50,
            height: 50
          },
          enlargedImagePortalId: "myPortal"
        }}
      />
    );
  }
}

export default withStyles(styles)(MyReactImageMagnify);
