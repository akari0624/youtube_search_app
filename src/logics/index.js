import swal from "sweetalert2";
import moment from 'moment'

const COLLECTIONs_KEY_IN_LOCAL_STORAGE = "videoCollections";

export const checkIsAddedInCollections = (itemId) => {
  const collectionsLiteral = window.localStorage.getItem(
    COLLECTIONs_KEY_IN_LOCAL_STORAGE
  );
  const videoCollections = collectionsLiteral && JSON.parse(collectionsLiteral)
  const has = videoCollections && videoCollections[itemId];
  return has;
};

export const getCollections = () => {
  const collectionsLiteral = window.localStorage.getItem(
    COLLECTIONs_KEY_IN_LOCAL_STORAGE
  );
  const videoCollections = collectionsLiteral && JSON.parse(collectionsLiteral)
  return videoCollections  // object
};


export const addToCollections = (id, item) => {
  try {
    const _testIsCollectionsObjExit = window.localStorage.getItem(
      COLLECTIONs_KEY_IN_LOCAL_STORAGE
    );
    if (!_testIsCollectionsObjExit) {
      window.localStorage.setItem(
        COLLECTIONs_KEY_IN_LOCAL_STORAGE,
        JSON.stringify(Object.create(null))
      );
    }
    const collectionsObj = JSON.parse(
      window.localStorage.getItem(COLLECTIONs_KEY_IN_LOCAL_STORAGE)
    );
    collectionsObj[id] = item;

    window.localStorage.setItem(
      COLLECTIONs_KEY_IN_LOCAL_STORAGE,
      JSON.stringify(collectionsObj)
    );
    return true;
  } catch (err) {
    console.error("add video to collections error:", err);
    swal.fire({
      icon: "error",
      titleText: "添加收藏時發生錯誤",
      text: err.message,
    });
    return false;
  }
};

export const removeVideoFromCollections = (id) => {
  const _testIsCollectionsObjExit = window.localStorage.getItem(
    COLLECTIONs_KEY_IN_LOCAL_STORAGE
  );
  // edge case
  if (!_testIsCollectionsObjExit) {
    swal.fire({
      icon: "error",
      titleText: "錯誤",
      text: "目前沒有收藏",
    });
    return;
  }
  const collectionsObj = JSON.parse(
    window.localStorage.getItem(COLLECTIONs_KEY_IN_LOCAL_STORAGE)
  );

  try {
    delete collectionsObj[id];

    window.localStorage.setItem(
      COLLECTIONs_KEY_IN_LOCAL_STORAGE,
      JSON.stringify(collectionsObj)
    );
    return true;
  } catch (err) {
    console.error("remove video from collections error:", err);
    swal.fire({
      icon: "error",
      titleText: "移除收藏時發生錯誤",
      text: err.message,
    });
    return false;
  }
};

export const countPageCount = (nowBounchDataCount, rowPerPage) => {
  const pages = Math.floor(nowBounchDataCount / rowPerPage);
  return nowBounchDataCount % rowPerPage > 0 ? pages + 1 : pages;
};

export const countSliceIndex = (nowPage, countPerPage) => {
  const lastPlusOneIndex = nowPage * countPerPage;
  const startIndex = lastPlusOneIndex - countPerPage;

  return [startIndex, lastPlusOneIndex];
};


export const parseISO8601DurationToTimes = (durationText) => {
  if(!durationText) {
    return '無法取得影片長度'
  }
  const duration = moment.duration(durationText)
  const _hours = duration.hours()
  const _minutes = duration.minutes()
  const _seconds = duration.seconds()
   return `${Number(_hours) ? _hours+'時' : ''} ${Number(_minutes) ? _minutes+'分' : ''} ${Number(_seconds) ? _seconds+'秒': ''}`

}
