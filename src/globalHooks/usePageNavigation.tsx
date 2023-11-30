// hooks/usePageNavigation.ts
import { useState } from "react";

const usePageNavigation = (initialPage: number = 1) => {
  const [currentPageId, setCurrentPageId] = useState(initialPage);

  const goToPage = (pageId: number | null) => {
    if (pageId !== null) {
      setCurrentPageId(pageId);
    }
  };

  const nextPage = () => goToPage(currentPageId + 1);
  const prevPage = () => goToPage(currentPageId - 1);

  return { currentPageId, goToPage, nextPage, prevPage };
};

export default usePageNavigation;
