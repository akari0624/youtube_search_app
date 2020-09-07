import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MoreFunctionShield from "./MoreFunctionShield";
import { VideoCardWrapper } from "./styled";
import { parseISO8601DurationToTimes } from "logics";

const FunctionalVideoCardWrapper = styled.section`
  position: relative;
`;

function VideoCardItem({ item, onCancelCollectionDone }) {
  const [isShowShield, setIsShowShield] = useState(false);

  const handleOnMouseEnter = (evt) => {
    setIsShowShield(true);
  };

  const handleOnMouseLeave = (evt) => {
    setIsShowShield(false);
  };

  const handleOnClick = (evt) => {
    setIsShowShield(prev => !prev);
  };


  return (
    <VideoCardWrapper>
      <FunctionalVideoCardWrapper onClick={handleOnClick} onMouseEnter={handleOnMouseEnter}>
        {isShowShield && (
          <MoreFunctionShield
            onMouseLeave={handleOnMouseLeave}
            itemData={item}
            onCancelCollectionDone={onCancelCollectionDone}
          />
        )}
        <div className="imgWrapper">
          <img src={item.snippet.thumbnails.medium.url} alt={item.title} />
        </div>
      </FunctionalVideoCardWrapper>
      <h3 className="title">{item.snippet.title}</h3>
      <div className="description">{item.snippet.description}</div>
      <div className="duration">
        {parseISO8601DurationToTimes(item.duration)}
      </div>
    </VideoCardWrapper>
  );
}

VideoCardItem.propTypes = {};

export default VideoCardItem;
