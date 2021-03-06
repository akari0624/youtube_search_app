import React from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";
import { useGetNowScrollDirection } from "hooks/useGetNowScrollDirection";

const TopClimbUp = keyframes`
  from {
    transform: translateY(0px); 
  }

  to {
    transform: translateY(-48px);
  }
`;

const topSlideDown = keyframes`
  from {
    transform: translateY(-48px); 
  }

  to {
    transform: translateY(0px);
  }
`;

const Title = styled.h1`
  padding: 5px;
  margin: 0;
`

const BackTo = styled.div`
  left: 20px;
  font-size: 2em;
  line-height: 48px;
  cursor: pointer;
  &:before {
    content: '<';
  }
`

const TopBarHeaderWrapper = styled.div`
position: relative;
  width: 100vw;
  display: flex;
  padding: 3px 0px;
  justify-content: center;
  z-index: 5;
  @media (max-width: 740px) {
    background: #ffffff;
    position: fixed;
    top: 0px;
    animation: ${topSlideDown} 0.5s linear forwards;
  }
`;

const HideTopBarHeaderWrapper = styled.div`
position: relative;
  width: 100vw;
  display: flex;
  padding: 3px 0px;
  justify-content: center;
  z-index: 5;
  @media (max-width: 740px) {
    background: #ffffff;
    position: fixed;
    top: 0px;
    animation: ${TopClimbUp} 0.5s linear forwards;
  }
`;


function HideableOnScrollHeader({children, goto}) {
      const history = useHistory()
      const backToMainPage =  (evt) => {
        goto(history)
      }
  const isScrollDown = useGetNowScrollDirection();

  return isScrollDown ? (
    <HideTopBarHeaderWrapper>
      <BackTo onClick={backToMainPage} /><Title>{children}</Title>
    </HideTopBarHeaderWrapper>
  ) : (
    <TopBarHeaderWrapper>
      <BackTo onClick={backToMainPage} /><Title>{children}</Title>
    </TopBarHeaderWrapper>
  );
}

HideableOnScrollHeader.propTypes = {};

export default HideableOnScrollHeader;
