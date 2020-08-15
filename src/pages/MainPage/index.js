import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import InputSearchBarForm from "./components/InputSearchBarForm";
import VideoCardsLayout from "./components/VideoCardsLayout";
import VideoCardItem from "./components/VideoCardItem";
import Paginations from "./components/Paginations"
import { getYOUTUBE_DATA_V3_URL, youtube_querySWRFetcher, getYOUTUBE_DATA_V3_URL_MAXROW_PERFETCH, youtube_querySWRFetcher_Fetch100CountData } from "apis";
import useSWR from 'swr'
import { useHistory } from 'react-router-dom'
import {AppEasyContext} from 'App'


const countSliceIndex = (nowPage, countPerPage) => {
  const lastPlusOneIndex = nowPage * countPerPage
  const startIndex = lastPlusOneIndex - countPerPage

  return [startIndex, lastPlusOneIndex]
}

const countPageCount = (nowBounchDataCount, rowPerPage) => {
  const pages = Math.floor(nowBounchDataCount / rowPerPage)
  return nowBounchDataCount % rowPerPage > 0 ? pages + 1 : pages
}

const ROW_PER_PAGE = 12

const renderPaginations = (bunchResultCount, rowPerPage, handleChangePage) => {
  if(bunchResultCount > 0) {
      const pagesCount = countPageCount(bunchResultCount, rowPerPage)
      return <Paginations pagesCount={pagesCount} rowsPerPage={ROW_PER_PAGE} onChangePage={handleChangePage}/>
  }
  return null
}

function MainPage() {  
  const {searchText, setSearchText} = useContext(AppEasyContext)
  const {data, error} = useSWR(getYOUTUBE_DATA_V3_URL_MAXROW_PERFETCH(searchText), youtube_querySWRFetcher_Fetch100CountData, {revalidateOnFocus: false})
  const history = useHistory()
  const pageInfo = data?.pageInfo ?? {
    totalResults: 0,
  }

  const [currPage, setCurrPage] = useState(1)
  const bunchResults = data?.items ?? []
  const bunchResultCount = bunchResults.length
  const [startIndex, lastPlusOneIndex] = countSliceIndex(currPage, ROW_PER_PAGE)
  const partialData = bunchResults.length > 0 ? bunchResults.slice(startIndex, lastPlusOneIndex) : []
 
  const onSubmit = (values) => {
    setSearchText(prev => values.keywords)
  }

 const handleChangePage = (event, newPage) => {
    setCurrPage(newPage);
  };

 

  return (
    <div>
      <InputSearchBarForm placeholder="搜尋" onSubmit={onSubmit} searchText={searchText}/>
      <VideoCardsLayout>
        {partialData.map((item) => (
          <VideoCardItem key={item.id.videoId} item={item} />
        ))}
      </VideoCardsLayout>
      <button onClick={() => {history.push('/collections')}}>to收藏頁</button>
      {renderPaginations(bunchResultCount, ROW_PER_PAGE, handleChangePage)}
    </div>
  );
}

MainPage.propTypes = {};


export default MainPage;
