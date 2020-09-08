import React, { useEffect, useRef, useState } from "react";
import _throttle from 'lodash.throttle';

export function useGetNowScrollDirection(thresholdHeight = 30) {

  const [isScrollDown, setIsScrollDown] = useState(false); // true 往下,  false 往上
  const isScrollDownRef = useRef(false); // true 往下,  false 往上
  const previousScrollTopRef = useRef(0);

  const _handleOnScroll = () => {
    const nowScrollTop = window.pageYOffset;
    // !isScrollDownRef.current  是true的話代表滑動方向改變
    console.log("nowScrollTop, previousScrollTopRef", nowScrollTop, previousScrollTopRef.current)
    // 用力拉到最上面的時候 previousScrollTopRef.current 會是負的 然後再稍微彈回來
    if (nowScrollTop > previousScrollTopRef.current && !isScrollDownRef.current && previousScrollTopRef.current > 0) {
      isScrollDownRef.current = !isScrollDownRef.current 
      setIsScrollDown(true);
    } else if (nowScrollTop < previousScrollTopRef.current && isScrollDownRef.current) {
      isScrollDownRef.current = !isScrollDownRef.current
      setIsScrollDown(false);
    }
    if (
       Math.abs(nowScrollTop - previousScrollTopRef.current) >= thresholdHeight
    ) {
       previousScrollTopRef.current = nowScrollTop;
    }

  };

  const throttledHandleONScroll = _throttle(_handleOnScroll, 500)

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleONScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleONScroll);
    };
  }, []);

  return isScrollDown;
}
