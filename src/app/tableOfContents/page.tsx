"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import useMouseMove from "@/globalHooks/useMouseMove";

const LandingPage = () => {
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
    ></Box>
  );
};

export default LandingPage;
