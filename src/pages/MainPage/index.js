import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import InputSearchBarForm from "./components/InputSearchBarForm";
import VideoCardsLayout from "./components/VideoCardsLayout";
import VideoCardItem from "./components/VideoCardItem";
import { getYOUTUBE_DATA_V3_URL, youtube_querySWRFetcher } from "apis";
import useSWR from 'swr'
import {AppEasyContext} from 'App'

function MainPage() {  
  const {searchText, setSearchText} = useContext(AppEasyContext)
  const {data: result, error} = useSWR(getYOUTUBE_DATA_V3_URL(searchText), youtube_querySWRFetcher )

  const pageInfo = result?.pageInfo ?? {
    totalResults: 0,
    resultsPerPage: 12,
  }
  const currQueryResults = result?.items ?? [] 

  const onSubmit = (values) => {
    setSearchText(prev => values.keywords)
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


export default MainPage;
