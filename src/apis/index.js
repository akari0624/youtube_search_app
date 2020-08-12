const getYOUTUBE_DATA_V3_URL = (searchKeyWords, apiKey, dataCountPerPage = 12) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchKeyWords}&chart=mostPopular&maxResults=${dataCountPerPage}&key=${process.env.REACT_APP_YOUTUBE_API_TOKEN}`;

export const youtube_query = (searchKeyWords) => {
  const url = getYOUTUBE_DATA_V3_URL(searchKeyWords, 'AIzaSyCCMyURuR3ue5XCRa4qY2q_Ud3sSEKhhOg')
  fetch(url).then(response => {
    return response.json();
  })
  .then(myJson => {
    console.log(myJson);
  });
};
