import React, {useState} from 'react'
import PropTypes from 'prop-types'
import InputSearchBarForm from './components/InputSearchBarForm'
import VideoCardsLayout from './components/VideoCardsLayout'
import VideoCardItem from './components/VideoCardItem'
import { youtube_query } from 'apis' 

function MainPage(props) {

  const [currQueryResults, setCurrQueryResults] = useState([])
  const [pageInfo, setPageInfo] = useState({
    totalResults: 0,
    resultsPerPage: 12,
  })
  const onSubmit = async (values) => {
    const result = await youtube_query(values.keywords)
    console.log('the result', result)
    if(result) {
    setPageInfo(prev => result.pageInfo)
    setCurrQueryResults(prev => result.items)
    }
  }

  return (
    <div>
      <InputSearchBarForm placeholder="搜尋" onSubmit={onSubmit} />
      <VideoCardsLayout>
        {
          currQueryResults.map(item => <VideoCardItem key={item.id.videoId} item={item} />)
        }
      </VideoCardsLayout>
    </div>
  )
}

MainPage.propTypes = {

}

export default MainPage

