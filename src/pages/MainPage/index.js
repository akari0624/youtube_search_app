import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import HideableOnScrollHeader from "./HideableOnScrollHeader";
import VideoCardsLayout from "./components/VideoCardsLayout";
import VideoCardItem from "./components/VideoCardItem";
import Paginations from "./components/Paginations";
import {
  getYOUTUBE_DATA_V3_URL,
  youtube_querySWRFetcher,
  getYOUTUBE_DATA_V3_URL_MAXROW_PERFETCH,
  youtube_querySWRFetcher_Fetch100CountData,
} from "apis";
import useSWR from "swr";
import { AppEasyContext } from "App";
import styled from "styled-components";
import { countPageCount } from 'logics'

const countSliceIndex = (nowPage, countPerPage) => {
  const lastPlusOneIndex = nowPage * countPerPage;
  const startIndex = lastPlusOneIndex - countPerPage;

  return [startIndex, lastPlusOneIndex];
};



const ROW_PER_PAGE = 12;

const renderPaginations = (bunchResultCount, rowPerPage, handleChangePage) => {
  if (bunchResultCount > 0) {
    const pagesCount = countPageCount(bunchResultCount, rowPerPage);
    return (
      <Paginations
        pagesCount={pagesCount}
        rowsPerPage={ROW_PER_PAGE}
        onChangePage={handleChangePage}
      />
    );
  }
  return null;
};

const VideosCenterPositionedWrapper = styled.section`
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-top: 32px;
`;

function MainPage() {
  const { searchText, setSearchText } = useContext(AppEasyContext);
  const { data, error } = useSWR(
    getYOUTUBE_DATA_V3_URL_MAXROW_PERFETCH(searchText),
    youtube_querySWRFetcher_Fetch100CountData,
    { revalidateOnFocus: false }
  );
  const pageInfo = data?.pageInfo ?? {
    totalResults: 0,
  };

  const [currPage, setCurrPage] = useState(1);
  const bunchResults = data?.items ?? [];
  const bunchResultCount = bunchResults.length;
  const [startIndex, lastPlusOneIndex] = countSliceIndex(
    currPage,
    ROW_PER_PAGE
  );
  const partialData =
    bunchResults.length > 0
      ? bunchResults.slice(startIndex, lastPlusOneIndex)
      : [];

  const onSubmit = (values) => {
    setSearchText((prev) => values.keywords);
  };

  const handleChangePage = (event, newPage) => {
    setCurrPage(newPage);
  };

  return (
    <main>
      <HideableOnScrollHeader onSubmit={onSubmit} searchText={searchText} />
      <VideosCenterPositionedWrapper>
        <VideoCardsLayout>
          {partialData.map((item) => (
            <VideoCardItem key={item.id.videoId} item={item} />
          ))}
        </VideoCardsLayout>
      </VideosCenterPositionedWrapper>
      {renderPaginations(bunchResultCount, ROW_PER_PAGE, handleChangePage)}
    </main>
  );
}

MainPage.propTypes = {};

export default MainPage;
