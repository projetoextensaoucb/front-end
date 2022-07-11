import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import MyReactImageMagnify from "./img-magnify";

class MyImageGallery extends Component {
  myRenderItem() {
    return <MyReactImageMagnify {...this.props} />;
  }

  render() {
    const properties = {
      showThumbnails: false,
      useBrowserFullscreen: false,
      showPlayButton: false,
      showFullscreenButton: false,
      renderItem: this.myRenderItem.bind(this),
      items: [
        {
          original: "static/images/catolica/email-institucional",
        },
        {
          original: "static/images/catolica/biblioteca-digital",
        }
      ]
    };
    return <ImageGallery {...properties} />;
  }
}

export default MyImageGallery;
