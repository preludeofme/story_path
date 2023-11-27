import { Card, Divider, Grid } from "@mui/material";
import React from "react";
import { BookPageSection } from "./pageSection/bookPageSection";
import { ContentData } from "@/app/story/page";
import { EndPage } from "./lastPage";
import LetterCard from "./pageSection/paperPage";

export interface BookPageProps {
  pageId: number;
  contents: ContentData[];
  type: "single" | "double" | "end";
  onClick: (pageId: number | null) => void;
}

export const BookPage: React.FC<BookPageProps> = ({ contents, type, onClick, pageId }) => {
  const renderContent = (content: ContentData, index: number) => {
    if (type === "end") {
      return (
        <Grid item xs={12}>
          <EndPage />
        </Grid>
      );
    }

    return (
      <React.Fragment key={index}>
        {/* <Grid item xs={type === "single" ? 11 : 5.5}>
          <BookPageSection contents={content} type={type} onClick={onClick} pageId={pageId} />
        </Grid>
        {type === "double" && content.nextPage && content.nextPage % 2 !== 0 && (
          <Grid item xs={0.1}>
            <Divider orientation="vertical" />
          </Grid>
        )} */}
        <LetterCard />
      </React.Fragment>
    );
  };

  return (
    <Grid container spacing={2} sx={{ margin: 1 }}>
      {contents.map(renderContent)}
    </Grid>
  );
};
