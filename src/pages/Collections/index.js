import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

function CollectionsPage(props) {
  const history = useHistory()
  return (
    <div>
      <h1>CollectionsPage</h1>
      <button onClick={() => {history.push('/')}}>回首頁</button>
    </div>
  )
}

CollectionsPage.propTypes = {

}

export default CollectionsPage

