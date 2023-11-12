import React from "react";
import { BookPage, BookTitle } from "./bookStyles";

export interface IBookPage {
  id: string | number; // Unique identifier for each page
  title?: string; // Optional: Title of the page
  content: React.ReactNode; // Main content as a React node
  style?: React.CSSProperties; // Optional: Inline styles for the page
  className?: string; // Optional: CSS class for the page
  additionalData?: Record<string, any>; // Optional: Any additional data or metadata
  // ... Add any other properties you might need
}

export const BookPages: IBookPage[] = [
  {
    id: 1,
    title: "Introduction",
    content: <p>This is the introduction page.</p>,
    className: "intro-page",
  },
  {
    id: 2,
    content: (
      <BookPage style={{ backgroundColor: "lightblue" }}>
        <BookTitle>Chapter 1</BookTitle>
        <p>Chapter content here...</p>
      </BookPage>
    ),
  },
  {
    id: 3,
    content: (
      <BookPage style={{ backgroundColor: "lightpink" }}>
        <BookTitle>Chapter 2</BookTitle>
        <p>Chapter content here...</p>
      </BookPage>
    ),
  },
  {
    id: 4,
    content: (
      <BookPage style={{ backgroundColor: "lightblue" }}>
        <BookTitle>Chapter 3</BookTitle>
        <p>Chapter content here...</p>
      </BookPage>
    ),
  },
  // ... more pages
];
