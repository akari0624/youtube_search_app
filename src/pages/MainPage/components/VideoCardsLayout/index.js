import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const FlexVideoLayout = styled.section`
  display: flex;
  width: 90vw;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 740px) {
    justify-content: center; /** make one row */
  }
`;

function VideoCardsLayout({ children }) {
  return <FlexVideoLayout>{children}</FlexVideoLayout>;
}

VideoCardsLayout.propTypes = {};

export default VideoCardsLayout;
