import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
// const flowplayer = require('flowplayer');
// const engine = require('flowplayer-hlsjs');
import flowplayer from 'flowplayer';
import engine from 'flowplayer-hlsjs';
import "../../css/flowplayer/flowplayer.min.css";


const EXAMPLE_M3U8_URL = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'

function VideoPlayerPage(props) {
  const history = useHistory();

useLayoutEffect(() => {
  engine(flowplayer);

  flowplayer('#videoPlayerContainer', {
  clip: {
    sources: [{
      type: 'application/x-mpegurl',
      src: EXAMPLE_M3U8_URL
    }]
  }
});

}, [])

  return (
    <>
    <div id="videoPlayerContainer">
      
    
    </div>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        回首頁
      </button>
      </>
  );
}

VideoPlayerPage.propTypes = {};

export default VideoPlayerPage;
