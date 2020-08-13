import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const FlexVideoLayout = styled.section`
  display: flex;
  padding: 1rem;
`

function VideoCardsLayout({children}) {
  return (
    <FlexVideoLayout>
      {children}
    </FlexVideoLayout>
  )
}

VideoCardsLayout.propTypes = {

}

export default VideoCardsLayout

