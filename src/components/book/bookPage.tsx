import React from "react";

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
      <div>
        <h2>Chapter 1</h2>
        <p>Chapter content here...</p>
      </div>
    ),
    style: { backgroundColor: "lightblue" },
  },
  // ... more pages
];
