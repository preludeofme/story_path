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
          <Typography variant="body1">
            Long Life I read somewhere that having good friends leads to a long life. If that’s the case, I’m basically immortal. I’ve been blessed
            during my life with more than my share of good friends, but these three here are the standouts. When I was (much) younger, I thought that
            anyone who was friendly to me was a friend. But a few experiences changed that perspective, and for most of my adult life I have had a
            pretty stringent set of guidelines by which I consider someone a friend. These three tick every one of the boxes on that list. And that’s
            clearly illustrated by the fact that over the past 50-60 years we’ve remained friends through all of life’s ups and downs. All three have
            known me when I was an immature teen, a self-absorbed young adult, and through times when I made some poor decisions. We don’t all share
            the same likes and dislikes by any means, but that really doesn’t impact our friendship – and that’s a mark of a true and lasting
            friendship. I’d do just about anything for these three guys, and what’s more, I know they’d do the same for me when the chips are down. I
            don’t have a million dollars, but I have these guys – and I wouldn’t trade them and their friendship for any amount of money.
          </Typography>
        </StyledCard>
      </ContentBox>
    </>
  );
};

export default LetterCard;
