"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import useMouseMove from "@/globalHooks/useMouseMove";
import JournalButton from "@/components/buttons/journalButton";
import BookContainer from "@/components/book/bookContainer";
import { CSSTransition } from "react-transition-group";
import "../css/transitions.css"; // Your CSS file for transitions

const LandingPage = () => {
  const [isOpen, setOpen] = useState(false);
  const { mousePosition, handleMouseMove } = useMouseMove();

  const handleBookClick = () => {
    setOpen(!isOpen);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseMove={(e) => handleMouseMove(e as unknown as MouseEvent)}
    >
      <Box
        sx={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
          top: 0,
          left: 0,
          zIndex: -1,
          transition: "transform 0.9s ease-out",
          transform: `scale(${mousePosition.scale})`,
        }}
      >
        <Image
          src="/background-evening.jpg" // Replace with your background image path
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </Box>

      <CSSTransition in={!isOpen} timeout={1500} classNames="fade" unmountOnExit>
        <Box sx={{ position: "absolute" }}>
          <JournalButton handleClick={handleBookClick} />
        </Box>
      </CSSTransition>

      <CSSTransition in={isOpen} timeout={1900} classNames="fade" unmountOnExit>
        <Box sx={{ position: "absolute" }}>
          <BookContainer />
        </Box>
      </CSSTransition>
    </Box>
  );
};

export default LandingPage;
