import React, { useState, useEffect } from "react";
import { useSprings, animated } from "react-spring";
import { useGesture } from "react-use-gesture";

import { calculate, CalculateResult, Side } from "./calculate";
import { BookPages } from "./bookPage";

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
  // ... existing state setup

  const initialPageStates: PageState[] = BookPages.map((_, index) => ({
    rotation: 0, // Initial rotation angle
    isVisible: true, // Initially, all pages are visible
    zIndex: index, // Initial z-index, could be based on the page order
    calculateResult: null, // Initial calculateResult
  }));

  const [pages, setPages] = useState<PageState[]>(initialPageStates);

  const [springs, api] = useSprings(pages.length, (index) => ({
    // Define initial spring styles based on page state
    // Use calculated values for styles if available
    transform: `rotateY(${pages[index].calculateResult?.r || 0}rad)`,
    // ... other styles based on calculateResult
  }));

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
        return newPages;
      });

      api.start((i) => ({
        transform: `rotateY(${calcResult?.r || 0}rad)`,
        // Additional styles based on calcResult and page state
      }));
    },
    // ... other gesture handlers
  });

  // ... useEffect and return statement
  return (
    <div id="book-container">
      {springs.map((props, index) => (
        <animated.div
          {...props}
          {...bind(index)}
          style={
            {
              /* Additional styles */
            }
          }
        >
          {/* Page content */}
        </animated.div>
      ))}
    </div>
  );
};
