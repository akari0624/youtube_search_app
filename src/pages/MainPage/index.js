import React from 'react'
import PropTypes from 'prop-types'
import InputSearchBarForm from './components/InputSearchBarForm'
import { youtube_query } from 'apis' 

function MainPage(props) {

  const onSubmit = (values) => {
    console.log('values', values)

    youtube_query(values.keywords)
  }

  return (
    <div>
      <InputSearchBarForm placeholder="搜尋" onSubmit={onSubmit} />
    </div>
  )
}

MainPage.propTypes = {

}

export default MainPage

