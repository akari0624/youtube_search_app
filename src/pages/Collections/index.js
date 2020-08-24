import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCollections } from "logics";
import { useHistory } from "react-router-dom";
import VideoCardItem from "../MainPage/components/VideoCardItem";
import VideoCardLayout from "../MainPage/components/VideoCardsLayout";
import styled from 'styled-components'


const VideosCenterPositionedWrapper = styled.section`
  display: flex;
  justify-content: center;
  width: 100vw;
`
function CollectionsPage(props) {
  const [nowCollections, setNowCollections] = useState([]);
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

  const renderCollections = (items) =>
    items.map((item) => (
      <VideoCardItem
        key={item.id.videoId}
        item={item}
        onCancelCollectionDone={onCancelCollectionDone}
      />
    ));

  return (
    <div>
      <h1>CollectionsPage</h1>
      <VideosCenterPositionedWrapper>
      {nowCollections.length > 0 ? (
        <VideoCardLayout>{renderCollections(nowCollections)}</VideoCardLayout>
      ) : (
        <div>目前沒有收藏</div>
      )}
      </VideosCenterPositionedWrapper>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        回首頁
      </button>
    </div>
  );
}

CollectionsPage.propTypes = {};

export default CollectionsPage;
