import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MoreFunctionShield from "./MoreFunctionShield";

const FunctionalVideoCardWrapper = styled.section`
  position: relative;
`;

const VideoCardWrapper = styled.article`
  margin: 0.4rem;
  width: 300px;
  height: 200px;
`;

function VideoCardItem({ item, onCancelCollectionDone }) {
  const [isShowShield, setIsShowShield] = useState(false);

  const handleOnMouseEnter = (evt) => {
    setIsShowShield(true);
  };

  const handleOnMouseLeave = (evt) => {
    setIsShowShield(false);
  };

  return (
    <VideoCardWrapper >
      <FunctionalVideoCardWrapper onMouseEnter={handleOnMouseEnter}>
        {isShowShield && (
          <MoreFunctionShield onMouseLeave={handleOnMouseLeave} itemData={item} onCancelCollectionDone={onCancelCollectionDone}/>
        )}
        <div>
          <img src={item.snippet.thumbnails.default.url} alt={item.title} />
        </div>
      </FunctionalVideoCardWrapper>
      <div>{item.snippet.title}</div>
      <div>{item.snippet.description}</div>
    </VideoCardWrapper>
  );
}

VideoCardItem.propTypes = {};

export default VideoCardItem;
