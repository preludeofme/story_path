"use client";
import React, { useEffect, useState } from "react";
import { Container, Box, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import TwoPageBook from "@/components/book/twoPageBook";
import Image from "next/image";
import { BookFrame } from "@/components/frame/frame";
import { BookPageProps } from "@/components/page/bookPage";
import storyData from "../../app/story.json";
import Fab from "@mui/material/Fab";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import BookSinglePageView from "@/components/book/singlePageBook";
import usePageNavigation from "@/globalHooks/usePageNavigation";
import useTouchNavigation from "@/globalHooks/useTouchNavigation";
import useMouseMove from "@/globalHooks/useMouseMove";

type MousePosition = {
  scale: number;
};

export interface ContentData {
  imageSrc: string;
  text: string;
  nextPage: number | null;
}

// interface PageDataJson {
//   pageId: number;
//   type: "single" | "double" | "end";
//   contents: ContentData[];
// }

export default function BookContainer() {
  const theme = useTheme();
  const minSwipeDistance = 50;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { currentPageId, goToPage, nextPage, prevPage } = usePageNavigation();
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchNavigation(minSwipeDistance, nextPage, prevPage);
  const { mousePosition, handleMouseMove } = useMouseMove();

  const [leftPageData, setLeftPageData] = useState<BookPageProps | null>(null);
  const [rightPageData, setRightPageData] = useState<BookPageProps | null>(null);
  const [visible, setVisible] = useState(true);

  const isPageNavButtonDisabled = (buttonName: string) => {
    let isDisabled: boolean = false;

    if (isSmallScreen) {
      if (leftPageData) {
        if (buttonName === "previous") {
          isDisabled = leftPageData.pageId % 2 === 0 || (leftPageData.type === "single" && leftPageData.pageId % 2 === 0);
        } else {
          isDisabled = leftPageData.pageId % 2 !== 0 || (leftPageData.type === "single" && leftPageData.pageId % 2 === 0);
        }
      }
    } else {
      if (rightPageData && leftPageData) {
        if (buttonName === "previous") {
          isDisabled = leftPageData.pageId % 2 === 0 || (leftPageData.type === "single" && leftPageData.pageId % 2 === 0);
        } else {
          isDisabled = rightPageData.pageId % 2 !== 0 || (rightPageData.type === "single" && rightPageData.pageId % 2 === 0);
        }
      }
    }

    return !isDisabled;
  };

  const handlePrevPage = () => {
    if (isSmallScreen) {
      goToPage(currentPageId - 1);
    } else if (!isSmallScreen && rightPageData) {
      {
        goToPage(currentPageId - 1);
      }
    }
  };
  const handleNextPage = () => {
    if (isSmallScreen) {
      if (leftPageData?.contents[0].nextPage) goToPage(currentPageId + 1);
    } else if (!isSmallScreen && rightPageData) {
      goToPage(rightPageData.contents[0].nextPage);
    }
  };

  // const parsePageData = (pageData: any): BookPageProps => {
  //   const validatedPageData = pageData as PageDataJson; // Type assertion here

  //   return {
  //     contents: validatedPageData.contents,
  //     type: validatedPageData.type,
  //     pageId: validatedPageData.pageId,
  //     onClick: (nextPage: number | null) => goToPage(nextPage),
  //   };
  // };
  const renderBookView = () => {
    if (isSmallScreen) {
      return <BookSinglePageView pageData={leftPageData} visible={visible} />;
    } else {
      return (
        <BookFrame>
          <TwoPageBook visible={visible} leftPage={leftPageData} rightPage={rightPageData} onClick={goToPage} />
        </BookFrame>
      );
    }
  };

  // useEffect(() => {
  //   const leftPage = storyData.find((page) => page.pageId === currentPageId);
  //   const rightPage = storyData.find((page) => page.pageId === currentPageId + 1);

  //   setLeftPageData(leftPage ? parsePageData(leftPage) : null);
  //   setRightPageData(rightPage ? parsePageData(rightPage) : null);
  // }, [currentPageId]);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          transform: "perspective(1500px) rotateY(0deg) rotateX(15deg) skewY(0deg)",
          transition: "transform 1.2s",
          "&:hover": {
            transform: "perspective(900px) rotateY(0deg) rotateX(0deg) skewY(0deg)",
          },
        }}
      >
        {renderBookView()}
      </Container>
      <Box
        sx={{
          position: "absolute",
          bottom: 5, // Adjust as needed for positioning
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 5,
        }}
      >
        <Fab color="primary" aria-label="previous" onClick={handlePrevPage} disabled={isPageNavButtonDisabled("previous")}>
          <UndoIcon />
        </Fab>
        <Fab color="secondary" aria-label="next" onClick={handleNextPage} disabled={isPageNavButtonDisabled("next")}>
          <RedoIcon />
        </Fab>
      </Box>
    </>
  );
}
