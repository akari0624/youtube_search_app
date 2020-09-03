import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCollections } from "logics";
import { useHistory } from "react-router-dom";
import VideoCardItem from "../MainPage/components/VideoCardItem";
import VideoCardLayout from "../MainPage/components/VideoCardsLayout";
import Paginations from "../MainPage/components/Paginations";
import HideableOnScrollHeader from './HideableOnScrollHeader'
import styled from 'styled-components'
import { countPageCount, countSliceIndex } from 'logics'


const VideosCenterPositionedWrapper = styled.section`
  display: flex;
  justify-content: center;
  width: 100vw;
  flex-direction: column;
  margin-top: 48px;
`

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
function CollectionsPage(props) {
  const [nowCollections, setNowCollections] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const history = useHistory();
  useEffect(() => {
    const collections = getCollections();
    if (collections) {
      setNowCollections(Object.values(collections));
    }
  }, []);

  const onCancelCollectionDone = () => {
    console.log("callback called");
    const collections = getCollections();
    if (collections) {
      setNowCollections(Object.values(collections));
    }
  };

  const [startIndex, lastPlusOneIndex] = countSliceIndex(
    currPage,
    ROW_PER_PAGE
  );
  const bunchResultCount = nowCollections.length;
  const partialData =
  nowCollections.length > 0
    ? nowCollections.slice(startIndex, lastPlusOneIndex)
    : [];

  const handleChangePage = (event, newPage) => {
    setCurrPage(newPage);
  };

  const renderCollections = (items) =>
    items.map((item) => (
      <VideoCardItem
        key={item.id.videoId}
        item={item}
        onCancelCollectionDone={onCancelCollectionDone}
      />
    ));

    

  return (
    <main>
      <HideableOnScrollHeader />
      <VideosCenterPositionedWrapper>
      {partialData.length > 0 ? (
          <>
          <VideosCenterPositionedWrapper>
            <VideoCardLayout>
              {renderCollections(partialData)}
            </VideoCardLayout>
          </VideosCenterPositionedWrapper>
          {renderPaginations(bunchResultCount, ROW_PER_PAGE, handleChangePage)}
</>
      ) : (
        <div>目前沒有收藏</div>
      )}
      </VideosCenterPositionedWrapper>
    </main>
  );
}

CollectionsPage.propTypes = {};

export default CollectionsPage;
