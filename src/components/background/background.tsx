"use client";
import React, { FC, ReactNode, useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import useMouseMove from "@/globalHooks/useMouseMove";

interface backgroundProps {
  children: ReactNode;
}
const BackgroundImageContainer: FC<backgroundProps> = ({ children }) => {
  const { mousePosition, handleMouseMove } = useMouseMove();

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
      {children}
    </Box>
  );
};

export default BackgroundImageContainer;
