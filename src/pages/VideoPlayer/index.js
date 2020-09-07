import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
// const flowplayer = require('flowplayer');
// const engine = require('flowplayer-hlsjs');
import flowplayer from 'flowplayer';
import engine from 'flowplayer-hlsjs';
import { VideoPlayer, VideoPlayerPageVideoInfoWrapper } from './styled'
import { parseISO8601DurationToTimes } from 'logics';
import HideableOnScrollHeader from 'components/NavigatorHideOnScrollHeader'
import "../../css/flowplayer/flowplayer.min.css";


const VideoInfo = ({itemData}) => (
  <VideoPlayerPageVideoInfoWrapper>
    <h1 className="title">{itemData.snippet.title}</h1>
    <div className="description">{itemData.snippet.description}</div>
    <div className="duration">{parseISO8601DurationToTimes(itemData.duration)}</div>
  </VideoPlayerPageVideoInfoWrapper>
)


const EXAMPLE_M3U8_URL = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'

const navigateBackCallback = (history) => {history.goBack()}

function VideoPlayerPage(props) {
  const {itemData} = props.location.state
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
    <HideableOnScrollHeader goto={navigateBackCallback}>video player page</HideableOnScrollHeader>
    <VideoPlayer id="videoPlayerContainer"/>
    <VideoInfo itemData={itemData} />
      </>
  );
}

VideoPlayerPage.propTypes = {};

export default VideoPlayerPage;
