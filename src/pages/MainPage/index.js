import React, { useState } from "react";
import PropTypes from "prop-types";
import InputSearchBarForm from "./components/InputSearchBarForm";
import VideoCardsLayout from "./components/VideoCardsLayout";
import VideoCardItem from "./components/VideoCardItem";
import { youtube_query, getYOUTUBE_DATA_V3_URL, youtube_querySWRFetcher } from "apis";
import useSWR from 'swr'

function MainPage({searchKeyWords, setSearchKeyWords}) {
  // const [currQueryResults, setCurrQueryResults] = useState([]);
  // const [pageInfo, setPageInfo] = useState({
  //   totalResults: 0,
  //   resultsPerPage: 12,
  // });
  const {data: result, error} = useSWR(getYOUTUBE_DATA_V3_URL(searchKeyWords), youtube_querySWRFetcher )
  // const onSubmit = async (values) => {
  //   const result = await youtube_query(values.keywords);
  //   console.log("the result", result);
  //   if (result) {
  //     setPageInfo((prev) => result.pageInfo);
  //     setCurrQueryResults((prev) => result.items);
  //   }
  // };
  const pageInfo = result?.pageInfo ?? {
    totalResults: 0,
    resultsPerPage: 12,
  }
  const currQueryResults = result?.items ?? [] 

  const onSubmit = (values) => {
    setSearchKeyWords(prev => values.keywords)
  }

  return (
    <div>
      <InputSearchBarForm placeholder="搜尋" onSubmit={onSubmit} />
      <VideoCardsLayout>
        {currQueryResults.map((item) => (
          <VideoCardItem key={item.id.videoId} item={item} />
        ))}
      </VideoCardsLayout>
    </div>
  );
}

MainPage.propTypes = {};


const MainPageEnhancer = () => {
  const [searchKeyWords, setSearchKeyWords] = useState(null)
  return (
  <MainPage searchKeyWords={searchKeyWords} setSearchKeyWords={setSearchKeyWords} />
  )
}

export default MainPageEnhancer;
