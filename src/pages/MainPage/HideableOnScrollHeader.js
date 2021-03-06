import React from "react";
import NavMoreIcon from "components/NavMoreIcon";
import Popover from "components/Popover";
import InputSearchBarForm from "./components/InputSearchBarForm";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";
import { useGetNowScrollDirection } from "hooks/useGetNowScrollDirection";

const TopClimbUp = keyframes`
  from {
    transform: translateY(0px); 
  }

  to {
    transform: translateY(-36px);
  }
`;

const topSlideDown = keyframes`
  from {
    transform: translateY(-34px); 
  }

  to {
    transform: translateY(0px);
  }
`;

const TopBarHeaderWrapper = styled.div`
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

export const PopoverContentWrapper = styled.div`
  border-radius: 9px;
  background-color: #FFFFFF;
	padding: 8px 8px 8px 8px;
	color: #565d84;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
	z-index: 8001;
	
	/** first level child*/
	& > * {
		display: flex;
		justify-content: center;
	}

	& a {
		color: #565d84;
	}

	& .lastShorterContent {
		padding: 12px 0px 4px 0px;
		border: none;
    cursor: pointer;
	}
`

const PopOverContent = () => {
  const history = useHistory();
  return (
    <PopoverContentWrapper>
      <div
        className="lastShorterContent"
        onClick={() => {
          history.push("/collections");
        }}
      >
        to收藏頁
      </div>
    </PopoverContentWrapper>
  );
};

function HideableOnScrollHeader({ onSubmit, searchText }) {
  const isScrollDown = useGetNowScrollDirection();

  return isScrollDown ? (
    <HideTopBarHeaderWrapper>
      <InputSearchBarForm
        placeholder="搜尋"
        onSubmit={onSubmit}
        searchText={searchText}
      />
      <Popover
        CompToRender={PopOverContent}
        offsetUpPX={4}
      >
        <NavMoreIcon dotColor="#808080" />
      </Popover>
    </HideTopBarHeaderWrapper>
  ) : (
    <TopBarHeaderWrapper>
      <InputSearchBarForm
        placeholder="搜尋"
        onSubmit={onSubmit}
        searchText={searchText}
      />
       <Popover
        CompToRender={PopOverContent}
        offsetUpPX={4}
      >
        <NavMoreIcon dotColor="#808080" />
      </Popover>
    </TopBarHeaderWrapper>
  );
}

HideableOnScrollHeader.propTypes = {};

export default HideableOnScrollHeader;
