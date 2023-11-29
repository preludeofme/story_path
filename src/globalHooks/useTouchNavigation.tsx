// hooks/useTouchNavigation.ts
import { useState } from "react";

const useTouchNavigation = (minSwipeDistance: number = 50, onNext: () => void, onPrev: () => void) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > minSwipeDistance) {
      onNext();
    } else if (touchEnd - touchStart > minSwipeDistance) {
      onPrev();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};

export default useTouchNavigation;
