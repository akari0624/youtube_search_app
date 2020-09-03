import swal from "sweetalert2";
import invariant from 'invariant'
import { RDOFakeData } from './fakeData'

const ONE_TIME_FETCH_YOUTUBE_API_THRESHOLD = 50;

export const getYOUTUBE_DATA_V3_SEARCH_URL = (
  searchKeyWords,
  oneTimeFetchItemCount = 12
) => {
  if (!searchKeyWords) {
    return null;
  }
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchKeyWords}&chart=mostPopular&type=video&maxResults=${oneTimeFetchItemCount}&key=${process.env.REACT_APP_YOUTUBE_API_TOKEN}`;
};

export const getYOUTUBE_DATA_V3_SEARCH_URL_MAXROW_PERFETCH = (searchKeyWords) => {
  const oneTimeFetchItemCount = ONE_TIME_FETCH_YOUTUBE_API_THRESHOLD;
  if (!searchKeyWords) {
    return null;
  }
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchKeyWords}&chart=mostPopular&type=video&maxResults=${oneTimeFetchItemCount}&key=${process.env.REACT_APP_YOUTUBE_API_TOKEN}`;
};

export const getYOUTUBE_DATA_V3_VIDEOS_URL = (
  commaSeperatedIDsString
) => {
  if(!commaSeperatedIDsString){
    return null
  }
  return `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${commaSeperatedIDsString}&key=${process.env.REACT_APP_YOUTUBE_API_TOKEN}`;
};

export const youtube_query = (searchKeyWords) => {
  const url = getYOUTUBE_DATA_V3_SEARCH_URL(
    searchKeyWords,
    process.env.REACT_APP_YOUTUBE_API_TOKEN
  );
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      if (result.error) {
        swal.fire({
          icon: "error",
          titleText: "發生錯誤",
          text: `code:${result.error.code}`,
        });
      } else {
        return result;
      }
    })
    .catch((err) => {
      swal.fire({
        icon: "error",
        titleText: "網路連線發生錯誤",
        text: err.message,
      });
    });
};

export const youtube_querySWRFetcher = (url) => {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      if (result.error) {
        swal.fire({
          icon: "error",
          titleText: "發生錯誤",
          text: `code:${result.error.code}`,
        });
      } else {
        return result;
      }
    })
    .catch((err) => {
      console.error(err)
      swal.fire({
        icon: "error",
        titleText: "網路連線發生錯誤",
        text: err.message,
      });
    });
};

export const getCommasSeperatedIDsStringFromVideoItems = (items) => {
  return items.reduce((acc, curr) => {
    if(curr?.id?.videoId) {
      acc += `${curr.id.videoId},`
      return acc
    }
    return acc
  }, '')

}

export const youtube_querySWRFetcher_Fetch100CountData = async (url) => {

 //  return RDOFakeData;

  try {
    const response1 = await fetch(url);
    invariant(response1.ok, `error: ${response1.status}`)
    const result1 = await response1.json();
    invariant(!result1.error, `error: ${result1?.error?.message}`)
    const shouldFetchMore =
      result1?.pageInfo?.totalResults > ONE_TIME_FETCH_YOUTUBE_API_THRESHOLD;

    const nextPageToken = result1?.nextPageToken;

    if (shouldFetchMore && nextPageToken) {
      const response2 = await fetch(url + `&pageToken=${nextPageToken}`);
      invariant(response2.ok, `error: ${response2.status}`)
      const result2 = await response2.json();
      invariant(!result2.error, `error: ${result2?.error?.message}`)
      result1.items.push(...result2.items);

    }

    return result1;
  } catch (err) {
    console.error(err)
    swal.fire({
      icon: "error",
      titleText: "發生錯誤",
      text: err.message,
    });
  }
  return null;
};


export const getVideoContentDetailFechingURL = (items) => {
  if(!items || items?.length === 0) {
    return null
  }
  const IDsString = getCommasSeperatedIDsStringFromVideoItems(items)
  const removeLastComma = IDsString.substring(0, IDsString.length -1)
  const getVideosContenDetailResourceURL = getYOUTUBE_DATA_V3_VIDEOS_URL(removeLastComma)
  return getVideosContenDetailResourceURL
}

// 一頁items 12筆
export const fetchVideodetailByIds = async (url) => {

  try{
  const response3 = await fetch(url)
  invariant(response3.ok, `error: ${response3.status}`)
  const result3 = await response3.json();
  invariant(!result3.error, `error: ${result3?.error?.message}`)
  console.log('result3', result3)
  return result3
} catch(err) {
  swal.fire({
    icon: "error",
    titleText: "發生錯誤",
    text: err.message,
  });
}
return null
}
