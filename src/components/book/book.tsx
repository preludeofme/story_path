import React, { useState, useEffect, CSSProperties } from "react";
import { useSprings, animated } from "react-spring";
import { useGesture } from "react-use-gesture";

import { calculate, CalculateResult, Side } from "./calculate";
import { BookPages } from "./bookPage";
import { AnimatedBookPage, BookContainer } from "./bookStyles";

interface PageState {
  // Example properties, adjust based on your actual requirements
  rotation: number;
  isVisible: boolean;
  zIndex: number;
  calculateResult: CalculateResult | null;
}

interface BookProps {
  // Book-related props if any
}

export const Book: React.FC<BookProps> = () => {
  const initialPageStates: PageState[] = BookPages.map((_, index) => ({
    rotation: 0,
    isVisible: index < 2, // Only the first two pages are visible
    zIndex: index,
    calculateResult: null,
  }));

  const [pages, setPages] = useState<PageState[]>(initialPageStates);
  const [currentPage, setCurrentPage] = useState(0); // Start from the first page

  const [springs, api] = useSprings(pages.length, (index) => {
    return {
      display: pages[index].isVisible ? "block" : "none",
      zIndex: pages[index].zIndex,
      transform: `rotateY(${pages[index].calculateResult?.r || 0}rad) 
                  translateX(${pages[index].calculateResult?.x || 0}px)`,
      config: { duration: 1000 },
      // Add any other properties you need to animate
    };
  });

  function determineSide(clientX: number, bookContainer: HTMLElement): Side {
    const rect = bookContainer.getBoundingClientRect();
    const midpoint = rect.left + rect.width / 2;
    return clientX < midpoint ? "left" : "right";
  }
  function determineNeedFinishTurn(movement: [number, number], velocity: number): boolean {
    // Define your thresholds
    const distanceThreshold = 100; // pixels
    const velocityThreshold = 0.5; // units per millisecond

    // Calculate the drag distance
    const dragDistance = Math.sqrt(movement[0] * movement[0] + movement[1] * movement[1]);

    // Determine if the turn needs to be finished
    return dragDistance > distanceThreshold || velocity > velocityThreshold;
  }

  const bind = useGesture({
    onDrag: ({ args: [index], down, movement, initial, velocity, xy }) => {
      const bookContainer = document.getElementById("book-container");
      if (!bookContainer) {
        console.error("Book container not found");
        return;
      }

      const [clientX, clientY] = xy;
      const side = determineSide(clientX, bookContainer);
      const needFinishTurn = determineNeedFinishTurn(movement, velocity);
      const calcResult = calculate(side, clientX, clientY, initial, down, needFinishTurn, movement);

      setPages((currentPages) => {
        const newPages = [...currentPages];
        newPages[index] = { ...newPages[index], calculateResult: calcResult };
        console.log("Updated Pages:", newPages); // Add this line
        return newPages;
      });

      api.start((i) => {
        if (i === index) {
          return {
            transform: `rotateY(${calcResult?.r || 0}rad) translateX(${calcResult?.x || 0}px)`,
            // Apply other relevant styles from calcResult
          };
        }
        return {};
      });

      // Logic to update currentPage and page visibility on drag end
      if (!down) {
        const shouldTurnPage = needFinishTurn; // Or any other logic to determine page turn

        if (shouldTurnPage) {
          // Update currentPage based on the side
          setCurrentPage((prev) => {
            let nextPage = prev;
            if (side === "right" && index === prev + 1) {
              nextPage = Math.min(prev + 2, BookPages.length - 2);
            } else if (side === "left" && index === prev) {
              nextPage = Math.max(prev - 2, 0);
            }
            return nextPage;
          });
        }

        // Update visibility of pages
        setPages((currentPages) =>
          currentPages.map((page, idx) => ({
            ...page,
            isVisible: idx >= currentPage && idx < currentPage + 2,
            zIndex: idx === currentPage || idx === currentPage + 1 ? 1000 : idx, // Ensure current pages are on top
          }))
        );
      }
    },
    // ... other gesture handlers
  });

  // ... useEffect and return statement
  return (
    <div id="book-container" style={{ backgroundColor: "lightgray", position: "relative" }}>
      {springs.map((animatedStyles, index) => {
        const key = BookPages[Math.floor(index / 2)].id + "-" + index;

        return (
          <div key={key} style={{ position: "relative", width: "100%", height: "100%" }}>
            <animated.div
              className="page"
              style={{
                backgroundColor: index % 2 === 0 ? "lightblue" : "lightcoral",
                position: "absolute",
                ...animatedStyles,
              }}
              {...bind(index)}
            >
              {/* page content */}
            </animated.div>
          </div>
        );
      })}
    </div>
  );
};
