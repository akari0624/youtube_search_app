import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCollections } from "logics";
import { useHistory } from "react-router-dom";
import VideoCardItem from "../MainPage/components/VideoCardItem";



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
    console.log('callback called')
    const collections = getCollections();
    if (collections) {
      setNowCollections(Object.values(collections));
    }
  }

  const renderCollections = (items) =>
  items.map((item) => <VideoCardItem key={item.id.videoId} item={item} onCancelCollectionDone={onCancelCollectionDone}/>);


  return (
    <div>
      <h1>CollectionsPage</h1>
      {nowCollections.length > 0 ? (
        renderCollections(nowCollections)
      ) : (
        <div>目前沒有收藏</div>
      )}
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
