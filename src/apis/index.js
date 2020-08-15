import swal from 'sweetalert2'

export const getYOUTUBE_DATA_V3_URL = (searchKeyWords, oneTimeFetchItemCount = 12) => {
  if(!searchKeyWords) {
    return null
  }
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchKeyWords}&chart=mostPopular&maxResults=${oneTimeFetchItemCount}&key=${process.env.REACT_APP_YOUTUBE_API_TOKEN}`;
}

export const youtube_query = (searchKeyWords) => {
  const url = getYOUTUBE_DATA_V3_URL(searchKeyWords, 'AIzaSyCCMyURuR3ue5XCRa4qY2q_Ud3sSEKhhOg')
  return fetch(url).then(response => {
    return response.json();
  })
  .then(result => {
    console.log(result);
    if(result.error) {
      swal.fire({
      icon: 'error',
			titleText: '發生錯誤',
			text: `code:${result.error.code}`
		})
    } else {
    return result
    }
  }).catch(err => {
    swal.fire({
      icon: 'error',
			titleText: '網路連線發生錯誤',
			text: err.message
		})
  });
};


export const youtube_querySWRFetcher = (url) => {
  return fetch(url).then(response => {
    return response.json();
  })
  .then(result => {
    console.log(result);
    if(result.error) {
      swal.fire({
      icon: 'error',
			titleText: '發生錯誤',
			text: `code:${result.error.code}`
		})
    } else {
    return result
    }
  }).catch(err => {
    swal.fire({
      icon: 'error',
			titleText: '網路連線發生錯誤',
			text: err.message
		})
  });
};
