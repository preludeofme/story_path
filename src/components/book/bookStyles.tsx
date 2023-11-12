import { styled } from "@mui/material";
import { animated } from "react-spring";

export const BookContainer = styled("div")({
  margin: "50px auto",
  position: "relative",
  display: "flex",
  userSelect: "none", // Disables text selection
  height: "800px",
  width: "900px",
});

interface BookPageProps {
  zIndex?: number; // Add other props as needed
  style?: React.CSSProperties; // Include this to allow passing inline styles
}
export const BookPage = styled("div")<BookPageProps>(({ zIndex, ...props }) => ({
  cursor: "pointer",
  width: "50%",
  height: "100%",
  position: "absolute",
  boxShadow: "inset -2px 0px 5px 0px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#fff",
  padding: "0px 30px",
  fontSize: "12px",
  transformOrigin: "0% 0%",
  "&:first-of-type": {
    left: 0,
  },
  ...props.style, // Merge any passed inline styles
  zIndex: zIndex, // Apply zIndex as an inline style
}));
export const AnimatedBookPage = animated(BookPage);
export const BookTitle = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
export const PageNumber = styled("div")({
  fontSize: "11px",
});
export const Heading1 = styled("h1")({
  fontSize: "20px",
  color: "rgba(255, 255, 255, 0.9)",
  margin: "60px auto 0 auto",
  lineHeight: 2.5,
  textAlign: "center",
  textTransform: "uppercase",
});
export const Right = styled("div")({
  textAlign: "right",
});
export const Heading3 = styled("h3")({
  margin: 0,
  padding: 0,
});

export const Heading4 = styled("h4")({
  margin: 0,
  padding: 0,
});
export const Shadow = styled("div")({
  position: "absolute",
  backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(184, 184, 184, 0) 100%)", // Increase opacity
  width: "60px",
  height: "100%",
  zIndex: 2,
  transformOrigin: "0 0",
});
export const Copy = styled("div")({
  width: "600px",
  textAlign: "center",
});
