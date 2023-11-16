"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

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
      onMouseMove={handleMouseMove}
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
          src="/park.png" // Replace with your background image path
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </Box>

      <Link href="/story" passHref>
        <Box
          sx={{
            width: "50vw",
            height: "70vh",
            cursor: "pointer",
            border: "5px solid",
            borderColor: "primary.main",
            boxShadow: "10px 10px 20px #aaa",
            overflow: "hidden",
            position: "relative",
            display: "flex", // Adding flexbox
            flexDirection: "column",
            justifyContent: "center", // Center content vertically within the box
            alignItems: "center", // Center content horizontally within the box
          }}
        >
          <Image
            src="/story/book cover.png" // Replace with your book cover image path
            alt="Book Cover"
            layout="responsive"
            width={1} // Aspect ratio width (1:1 in this case)
            height={1} // Aspect ratio height, adjust as needed
            objectFit="contain"
          />
          <Box
            sx={{
              position: "absolute", // Absolute positioning
              top: "50%", // Center vertically
              left: "50%",
              backgroundColor: "white",
              opacity: "85%",
              transform: "translate(-50%, -50%)", // Adjust for centering
              textAlign: "center",
              zIndex: 2,
            }}
          >
            <Typography
              variant="h2"
              color="black"
              sx={{ textAlign: "center", mt: 2, fontFamily: '"Times New Roman", Times, serif', fontWeight: "bold" }}
            >
              {"World War Nuggie"}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h4" color="black" sx={{ textAlign: "center", mt: 2, fontFamily: '"Times New Roman", Times, serif' }}>
          Click to Start the Adventure!
        </Typography>
      </Link>
    </Box>
  );
};

export default LandingPage;
