import React, { useState, useContext, useCallback, memo } from "react";
import PropTypes from "prop-types";
import HideableOnScrollHeader from "./HideableOnScrollHeader";
import VideoCardsLayout from "./components/VideoCardsLayout";
import VideoCardItem from "./components/VideoCardItem";
import Paginations from "./components/Paginations";
import {
  getYOUTUBE_DATA_V3_SEARCH_URL_MAXROW_PERFETCH,
  youtube_querySWRFetcher_Fetch100CountData,
  getVideoContentDetailFechingURL,
  fetchVideodetailByIds,
} from "apis";
import useSWR from "swr";
import { AppEasyContext } from "App";
import styled from "styled-components";
import { countPageCount, countSliceIndex } from "logics";

const ROW_PER_PAGE = 12;

const renderPaginations = (bunchResultCount, rowPerPage, handleChangePage, nowPage) => {
  if (bunchResultCount > 0) {
    const pagesCount = countPageCount(bunchResultCount, rowPerPage);
    return (
      <Paginations
        nowPage={nowPage}
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
  const { searchText, setSearchText, mainPageCurrPageNumber, setMainPageCurrPageNumber } = useContext(AppEasyContext);
  const { data, error } = useSWR(
    getYOUTUBE_DATA_V3_SEARCH_URL_MAXROW_PERFETCH(searchText),
    youtube_querySWRFetcher_Fetch100CountData,
    { revalidateOnFocus: false }
  );
  const pageInfo = data?.pageInfo ?? {
    totalResults: 0,
  };

  const bunchResults = data?.items ?? [];
  const bunchResultCount = bunchResults.length;
  const [startIndex, lastPlusOneIndex] = countSliceIndex(
    mainPageCurrPageNumber,
    ROW_PER_PAGE
  );
  const partialData =
    bunchResults.length > 0
      ? bunchResults.slice(startIndex, lastPlusOneIndex)
      : [];

  const {
    data: partitalContentDdetailData,
    error: error2,
  } = useSWR(
    getVideoContentDetailFechingURL(partialData),
    fetchVideodetailByIds,
    { revalidateOnFocus: false }
  );
  console.log("partitalContentDdetailData", partitalContentDdetailData);

  if (partitalContentDdetailData) {
    // merge the data
    partialData.forEach((p, idx) => {
      p.duration =
        partitalContentDdetailData?.items[idx]?.contentDetails?.duration;
    });
  }

  const onSubmit = (values) => {
    setSearchText((prev) => values.keywords);
  };

  const handleChangePage = useCallback((event, newPage) => {
    setMainPageCurrPageNumber(newPage);
  }, []);

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
      {renderPaginations(bunchResultCount, ROW_PER_PAGE, handleChangePage, mainPageCurrPageNumber) }
    </main>
  );
}

MainPage.propTypes = {};

export default MainPage;
