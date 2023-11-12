"use client";
import { Book } from "@/components/book/book";
import { Container, Typography, Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

type MousePosition = {
  scale: number;
};

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ scale: 1 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Calculate the distance from the center of the screen
    const distanceX = Math.abs(clientX - width / 2);
    const distanceY = Math.abs(clientY - height / 2);
    // Calculate the scale based on the distance from the center, with some limits
    const scale = 1 + (distanceX / width + distanceY / height) * 0.2; // Adjust the multiplier for sensitivity
    setMousePosition({ scale });
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
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
          transition: "transform 1.9s ease-out", // Smooth the scaling transition
          transform: `scale(${mousePosition.scale})`, // Apply scale transformation here
        }}
      >
        <Image
          src="/park.png"
          alt="Park"
          quality={75}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
      </Box>
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Typography variant="h2" gutterBottom component="h1">
          Welcome to Our Park
        </Typography>
        <Book />
      </Container>
    </Box>
  );
}
