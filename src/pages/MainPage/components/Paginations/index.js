import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import styled, { keyframes } from 'styled-components'
import { useGetNowScrollDirection } from 'hooks/useGetNowScrollDirection'


const bottomClimbUp = keyframes`
  from {
    transform: translateY(34px); 
  }

  to {
    transform: translateY(0px);
  }
`

const bottomSlideDown = keyframes`
  from {
    transform: translateY(0px); 
  }

  to {
    transform: translateY(34px);
  }
`

const PaginationWrapper = styled.div`
    width: 100vw;
    display: flex;
    padding: 3px 0px;
    justify-content: center;
    & > *: {
      marginTop: .2rem,
    }
    @media(max-width: 740px) {
      background: #FFFFFF;
      position: fixed;
      bottom: 0px;
      animation: ${bottomClimbUp} .5s linear forwards;
    }
`

const HidePaginationWrapper = styled.div`
    width: 100vw;
    display: flex;
    padding: 3px 0px;
    justify-content: center;
    & > *: {
      marginTop: .2rem,
    }
    @media(max-width: 740px) {
      background: #FFFFFF;
      position: fixed;
      bottom: -34px;
      animation: ${bottomSlideDown} .5s linear forwards;
    }
`

export default function PaginationRounded({pagesCount, rowsPerPage, totalPage, onChangePage}) {
  // const classes = useStyles();
  const isScrollDown = useGetNowScrollDirection()
  console.log('isScrollDown', isScrollDown)
  return isScrollDown ? (
    <HidePaginationWrapper>
      <Pagination count={pagesCount} onChange={onChangePage} variant="outlined" shape="rounded" rowsPerPage={rowsPerPage}/>
    </HidePaginationWrapper>
  ) : (
    <PaginationWrapper>
      <Pagination count={pagesCount} onChange={onChangePage} variant="outlined" shape="rounded" rowsPerPage={rowsPerPage}/>
    </PaginationWrapper>
  );
}