"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import PostEditor from "@/components/postEditor/postEditor";

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ scale: 1 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const distanceX = Math.abs(clientX - width / 2);
    const distanceY = Math.abs(clientY - height / 2);
    const scale = 1 + (distanceX / width + distanceY / height) * 0.2;
    setMousePosition({ scale });
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

      <Link href="/thoughts" passHref>
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
            transform: "perspective(1500px) rotateY(0deg) rotateX(15deg) skewY(0deg)",
            transition: "transform 1.2s",
            "&:hover": {
              transform: "perspective(900px) rotateY(0deg) rotateX(0deg) skewY(0deg)",
            },
          }}
        >
          <Image
            src="/journal.png" // Replace with your book cover image path
            alt="Book Cover"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Link>
    </Box>
  );
};

export default LandingPage;
