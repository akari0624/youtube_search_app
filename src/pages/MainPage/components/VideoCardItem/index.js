import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const VideoCardWrapper = styled.article`
  margin: .4rem;
`

function VideoCardItem({item}) {
  return (
    <VideoCardWrapper>
       <div><img src={item.snippet.thumbnails.default.url} alt={item.title} /></div>
       <div>{item.snippet.title}</div>
       <div>{item.snippet.description}</div>
    </VideoCardWrapper>
  )
}

VideoCardItem.propTypes = {

}

export default VideoCardItem

