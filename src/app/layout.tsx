import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thoughts Of My Father",
  description: "A place for Keith Buck's thoughts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
