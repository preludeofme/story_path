import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const PaperOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  mixBlendMode: "multiply",
  backgroundRepeat: "repeat",
  pointerEvents: "none",
  backgroundImage: 'url("data:image/jpeg;base64,/9j/4AAQSkZ...")', // Add the full data URL here
  zIndex: -1, // Ensure it's behind the content
});

const ContentBox = styled(Box)({
  width: "min(100%, 600px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "auto",
  position: "relative",
});

const StyledCard = styled(Card)({
  fontFamily: '"Libre Baskerville", serif',
  padding: "20px",
  color: "#000",
  maxWidth: "600px",
  backgroundColor: "transparent", // Optional, depending on desired effect
});

const CaptionBox = styled(Box)({
  textAlign: "center",
  paddingTop: "8px",
});

const LetterCard: React.FC = () => {
  return (
    <>
      <PaperOverlay />
      <ContentBox>
        <StyledCard>
          <Typography variant="body1">here is my content</Typography>
        </StyledCard>
        <CaptionBox>here is my caption</CaptionBox>
      </ContentBox>
    </>
  );
};

export default LetterCard;
