import swal from "sweetalert2";
import invariant from 'invariant'
import { RDOFakeData } from './fakeData'

const ONE_TIME_FETCH_YOUTUBE_API_THRESHOLD = 50;

export const getYOUTUBE_DATA_V3_URL = (
  searchKeyWords,
  oneTimeFetchItemCount = 12
) => {
  if (!searchKeyWords) {
    return null;
  }
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchKeyWords}&chart=mostPopular&maxResults=${oneTimeFetchItemCount}&key=${process.env.REACT_APP_YOUTUBE_API_TOKEN}`;
};

export const getYOUTUBE_DATA_V3_URL_MAXROW_PERFETCH = (searchKeyWords) => {
  const oneTimeFetchItemCount = ONE_TIME_FETCH_YOUTUBE_API_THRESHOLD;
  if (!searchKeyWords) {
    return null;
  }
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchKeyWords}&chart=mostPopular&maxResults=${oneTimeFetchItemCount}&key=${process.env.REACT_APP_YOUTUBE_API_TOKEN}`;
};

export const youtube_query = (searchKeyWords) => {
  const url = getYOUTUBE_DATA_V3_URL(
    searchKeyWords,
    "AIzaSyCCMyURuR3ue5XCRa4qY2q_Ud3sSEKhhOg"
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

export const youtube_querySWRFetcher_Fetch100CountData = async (url) => {

   return RDOFakeData;

  // try {
  //   const response1 = await fetch(url);
  //   invariant(response1.ok, `error: ${response1.status}`)
  //   const result1 = await response1.json();
  //   invariant(!result1.error, `error: ${result1?.error?.message}`)
  //   const shouldFetchMore =
  //     result1?.pageInfo?.totalResults > ONE_TIME_FETCH_YOUTUBE_API_THRESHOLD;

  //   const nextPageToken = result1?.nextPageToken;

  //   if (shouldFetchMore && nextPageToken) {
  //     const response2 = await fetch(url + `&pageToken=${nextPageToken}`);
  //     invariant(response2.ok, `error: ${response2.status}`)
  //     const result2 = await response2.json();
  //     invariant(!result1.error, `error: ${result1?.error?.message}`)
  //     result1.items.push(...result2.items);
  //   }

  //   return result1;
  // } catch (err) {
  //   console.error(err)
  //   swal.fire({
  //     icon: "error",
  //     titleText: "發生錯誤",
  //     text: err.message,
  //   });
  // }
  // return null;
};
