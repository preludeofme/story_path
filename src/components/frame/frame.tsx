import React from "react";
import { Box } from "@mui/material";

interface FrameProps {
  children?: React.ReactNode; // The book pages or any other content
}

export const BookFrame: React.FC<FrameProps> = ({ children }) => {
  return (
    <Box
      id="BookFrame"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px auto",
        padding: "20px",
        background: "linear-gradient(to bottom, #e4e4e6, #e4e4e6)", // Subtle gradient
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        width: "calc(70vw + 40px)", // Adjust width to fit the book plus padding
        height: "86vh", // This height will control the scaling of the pages too
        position: "relative",
        border: "5px solid black", // This border scales correctly
        maxWidth: "none",
        zIndex: 0,
      }}
    >
      {[...Array(5)].map((_, index) => (
        <Box
          key={index}
          id={"page-" + index}
          sx={{
            position: "absolute",

            top: 0, // Align with the top of the container
            right: 0, // Align with the right of the container
            bottom: 0, // Align with the bottom of the container
            left: 0, // Align with the left of the container
            margin: `${index * 2}px`, // Create the stacked effect, adjust the multiplier as needed
            background: "linear-gradient(to bottom, #dedfe1, #dedfe1)", // Subtle gradient
            zIndex: 1,
            width: `calc(100% - ${index * 3}px)`, // Scale width based on the book's border
            height: `calc(100% - ${index * 3}px + 0px)`, // Scale height based on the book's border
            border: "1px solid #bbb",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease", // Smooth the transition on resizing
            "&:after": {
              // Pseudo-element for the line
              content: '""',
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%", // Center the line
              width: "1px", // Line width
              backgroundColor: "#000", // Line color
              zIndex: 2, // Above the extra pages
            },
          }}
        />
      ))}
      {children}
    </Box>
  );
};
