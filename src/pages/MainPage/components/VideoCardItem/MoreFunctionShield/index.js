import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  checkIsAddedInCollections,
  addToCollections,
  removeVideoFromCollections,
} from "logics";

const MoreFunctionShieldWrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddToCollectionButton = styled.button`
  border-radius: 5px;
`;

function MoreFunctionShield({ onMouseLeave, itemData }) {
  const collectionVideoId = `${itemData.id.kind}.${itemData.id.videoId || itemData.id.channelId}`;

  const isExitinCollection = checkIsAddedInCollections(collectionVideoId);

  const [isInCollection, setIsInCollection] = useState(isExitinCollection);

  const onCancelCollection = () => {
    const result = removeVideoFromCollections(collectionVideoId);
    if (result) {
      setIsInCollection(false);
    }
  };
  const onAddToCollection = () => {
    const result = addToCollections(collectionVideoId, itemData);
    if (result) {
      setIsInCollection(true);
    }
  };
  return (
    <MoreFunctionShieldWrapper onMouseLeave={onMouseLeave}>
      {isInCollection ? (
        <AddToCollectionButton onClick={onCancelCollection}>
          取消收藏
        </AddToCollectionButton>
      ) : (
        <AddToCollectionButton onClick={onAddToCollection}>
          加入收藏
        </AddToCollectionButton>
      )}
    </MoreFunctionShieldWrapper>
  );
}

MoreFunctionShield.propTypes = {};

export default MoreFunctionShield;
