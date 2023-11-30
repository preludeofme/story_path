import { Card, Divider, Grid } from "@mui/material";
import React from "react";

import { EndPage } from "./lastPage";
import LetterCard from "./pageSection/paperPage";
import { ContentData } from "../book/bookContainer";

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
