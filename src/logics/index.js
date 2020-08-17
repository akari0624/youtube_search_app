import swal from "sweetalert2";

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
