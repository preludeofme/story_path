"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import useMouseMove from "@/globalHooks/useMouseMove";
import JournalButton from "@/components/buttons/journalButton";
import BookContainer from "@/components/book/bookContainer";
import { CSSTransition } from "react-transition-group";
import "../css/transitions.css"; // Your CSS file for transitions
import BackgroundImageContainer from "@/components/background/background";

const LandingPage = () => {
  const [isOpen, setOpen] = useState(false);
  const { mousePosition, handleMouseMove } = useMouseMove();

  const handleBookClick = () => {
    setOpen(!isOpen);
  };

  return (
    <BackgroundImageContainer>
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
    </BackgroundImageContainer>
  );
};

export default LandingPage;
