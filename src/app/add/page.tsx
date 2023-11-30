"use client";
import React, { useState } from "react";

import { Box } from "@mui/material";

import PostEditor from "@/components/postEditor/postEditor";
import BackgroundImageContainer from "@/components/background/background";

const AddPostPage = () => {
  return (
    <BackgroundImageContainer>
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
        <PostEditor />
      </Box>
    </BackgroundImageContainer>
  );
};

export default AddPostPage;
