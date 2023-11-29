"use client";
import React, { useState } from "react";

import { Box } from "@mui/material";

import PostEditor from "@/components/postEditor/postEditor";

const AddPostPage = () => {
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
      <PostEditor />
    </Box>
  );
};

export default AddPostPage;
