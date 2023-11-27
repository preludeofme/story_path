import { Card, Grid, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import { BookPageProps, BookPage } from "../page/bookPage";

interface BookProps {
  leftPage: BookPageProps | null;
  rightPage: BookPageProps | null;
  visible: boolean;
  onClick: (pageId: number | null) => void;
}

const TwoPageBook: React.FC<BookProps> = ({ leftPage, rightPage, visible }) => (
  <Box
    id="twoBookPage"
    sx={{
      width: "100vw",
      height: "82vh",
      marginLeft: "6px",
      overflow: "hidden",
      position: "relative",
      backgroundColor: "#e4e4e6", // Off-white paper color
      background: "linear-gradient(to bottom, #e4e4e6, #e4e4e6)", // Subtle gradient
      zIndex: 2,
    }}
  >
    <Grid container sx={{ height: "100%" }}>
      <Grid
        item
        xs={6}
        sx={{
          position: "relative",
          background: "url(/white_paper_texture_set.png)", // Paper texture background
          padding: "20px", // Padding to simulate page margin
          opacity: visible ? 1 : 0,
          transition: "opacity 1.0s ease",
        }}
      >
        {leftPage && <BookPage {...leftPage} />}
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "6px",
            borderRight: "1px solid black",
            boxShadow: "16px 0 30px rgba(0, 0, 0, 0.8)", // Adjusted shadow opacity
          }}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          position: "relative",
          background: "url(/white_paper_texture_set.png)", // Paper texture background
          padding: "20px", // Padding to simulate page margin
          opacity: visible ? 1 : 0,
          transition: "opacity 1.0s ease",
        }}
      >
        {rightPage && <BookPage {...rightPage} />}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "6px",
            borderLeft: "1px solid black",
            boxShadow: "-16px 0 30px rgba(0, 0, 0, 0.8)", // Adjusted shadow opacity
          }}
        />
      </Grid>
    </Grid>
  </Box>
);

export default TwoPageBook;
