"use client";
import { FC } from "react";
import Link from "next/link";
import { Box } from "@mui/material";
import Image from "next/image";

interface journalProps {
  handleClick: () => void;
}

const JournalButton: FC<journalProps> = ({ handleClick }) => {
  return (
    <Box
      sx={{
        width: "20vw",
        height: "50vh",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        display: "flex", // Adding flexbox
        flexDirection: "column",
        justifyContent: "center", // Center content vertically within the box
        alignItems: "center", // Center content horizontally within the box
        transform: "perspective(1500px) rotateY(0deg) rotateX(19deg) skewY(0deg)",
        transition: "transform 1.2s",
        "&:hover": {
          transform: "perspective(900px) rotateY(0deg) rotateX(0deg) skewY(0deg)",
        },
      }}
      onClick={handleClick}
    >
      <Image
        src="/journal.png" // Replace with your book cover image path
        alt="Book Cover"
        fill
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
};

export default JournalButton;
