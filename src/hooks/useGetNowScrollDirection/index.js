import React, { useEffect, useRef, useState } from "react";

export function useGetNowScrollDirection(thresholdHeight = 30) {

  const [isScrollDown, setIsScrollDown] = useState(false); // true 往下,  false 往上
  const isScrollDownRef = useRef(false); // true 往下,  false 往上
  const previousScrollTopRef = useRef(0);

  const _handleOnScroll = () => {
    const nowScrollTop = window.pageYOffset;
    // !isScrollDownRef.current  是true的話代表滑動方向改變
    if (nowScrollTop > previousScrollTopRef.current && !isScrollDownRef.current) {
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

  useEffect(() => {
    window.addEventListener("scroll", _handleOnScroll);
    return () => {
      window.removeEventListener("scroll", _handleOnScroll);
    };
  }, []);

  return isScrollDown;
}
