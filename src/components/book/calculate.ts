export type Side = "left" | "right";

export interface CalculateResult {
  z0x: number;
  z0y: number;
  z1x: number;
  z1y: number;
  x: number;
  y: number;
  r: number;
  display: string;
  z0: number;
  z1: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  x3?: number;
  y3?: number;
  x4?: number;
  y4?: number;
}

const bookWidth = 500;
const bookHeight = 500;

export function calculate(
  side: Side,
  clientX: number,
  clientY: number,
  initial: [number, number],
  down: boolean,
  needFinishTurn: boolean,
  movement: [number, number]
): CalculateResult {
  const bookContainer = document.getElementById("book-container");
  if (!bookContainer) {
    throw new Error("Book container not found");
  }
  const offsetLeft = bookContainer.offsetLeft;
  const offsetTop = bookContainer.offsetTop;
  const pageWidth = bookWidth / 2;
  const result: CalculateResult = {
    z0x: 0,
    z0y: 0,
    z1x: 0,
    z1y: 0,
    x: 0,
    y: 0,
    r: 0,
    display: down ? "block" : "none", // Adjusted display based on down
    z0: 0,
    z1: 0,
  };

  const { movementStartX, movementStartY } = getInitialMovement(initial, offsetLeft, offsetTop);
  const { cursorX, cursorY } = getCursorPositions(clientX, clientY, offsetLeft, offsetTop);
  const { startX, startY } = getStartPositions(side, movementStartX, movementStartY);

  // Use movement if needed. This is a placeholder for your logic.
  // const deltaX = movement[0];
  // const deltaY = movement[1];

  const mx = (startX + cursorX) / 2;
  const my = (startY + cursorY) / 2;
  const slope = calculateSlope(cursorX, startX, startY, cursorY);
  const { z0x, z0y, z0, z1x, z1y, z1 } = calculateCornerPoints(side, cursorX, cursorY, slope, mx, my, pageWidth);
  const { u0x, u0y, u1x, u1y } = calculateReflectionPoints(z0x, z0y, z1x, z1y, side, slope, mx, my);

  // Calculate angle for page rotation
  result.r = calculateRotationAngle(u0x, u0y, u1x, u1y);

  // Set other result properties based on the calculations
  // ...

  // Handle when the user is not actively dragging or when the page turn needs to finish
  if (!down) {
    handlePageTurnCompletion(result, side, needFinishTurn, z0, z1, pageWidth, bookHeight, u0x, u0y, u1x, u1y);
  }

  return result;
}

function getInitialMovement(initial: [number, number], offsetLeft: number, offsetTop: number) {
  return {
    movementStartX: initial[0] - offsetLeft,
    movementStartY: initial[1] - offsetTop,
  };
}

function getCursorPositions(clientX: number, clientY: number, offsetLeft: number, offsetTop: number) {
  let cursorX = clientX - offsetLeft;
  let cursorY = clientY - offsetTop;

  cursorX = Math.max(0, Math.min(cursorX, bookWidth));
  cursorY = Math.max(0, Math.min(cursorY, bookHeight));

  return { cursorX, cursorY };
}

function calculateSlope(cursorX: number, startX: number, startY: number, cursorY: number): number {
  return (cursorX - startX) / (startY - cursorY);
}

function calculateCornerPoints(
  side: Side,
  cursorX: number,
  cursorY: number,
  slope: number,
  mx: number,
  my: number,
  pageWidth: number
): { z0x: number; z0y: number; z0: number; z1x: number; z1y: number; z1: number } {
  let z0x = -my / slope + mx;
  let z0y = 0;
  let z1x = (bookHeight - my) / slope + mx;
  let z1y = bookHeight;
  let z0 = 0;
  let z1 = 0;

  if (side === "right") {
    if (z0x > bookWidth) {
      z0x = bookWidth;
      z0y = slope * (bookWidth - mx) + my;
      z0 = 1;
    }
    if (z0x < pageWidth) {
      z0x = pageWidth;
    }

    if (z1x > bookWidth) {
      z1x = bookWidth;
      z1y = slope * (bookWidth - mx) + my;
      z1 = 1;
    }
    if (z1x < pageWidth) {
      z1x = pageWidth;
    }
  } else {
    // side === "left"
    if (z0x < 0) {
      z0x = 0;
      z0y = -slope * mx + my;
      z0 = 1;
    }
    if (z0x > pageWidth) {
      z0x = pageWidth;
    }

    if (z1x < 0) {
      z1x = 0;
      z1y = -slope * mx + my;
      z1 = 1;
    }
    if (z1x > pageWidth) {
      z1x = pageWidth;
    }
  }

  return { z0x, z0y, z0, z1x, z1y, z1 };
}

function calculateReflectionPoints(
  z0x: number,
  z0y: number,
  z1x: number,
  z1y: number,
  side: Side,
  slope: number,
  mx: number,
  my: number
): { u0x: number; u0y: number; u1x: number; u1y: number } {
  // Calculate the line equation coefficients A, B, C for the reflection line
  const A = z1y - z0y;
  const B = z0x - z1x;
  const C = -(A * z0x + B * z0y);

  // Implement the reflection logic based on the formulas in your JavaScript code
  function reflectX(x: number, y: number): number {
    return ((B * B - A * A) * x - 2 * A * B * y - 2 * A * C) / (A * A + B * B);
  }

  function reflectY(x: number, y: number): number {
    return ((A * A - B * B) * y - 2 * A * B * x - 2 * B * C) / (A * A + B * B);
  }

  // Calculate reflection points
  let u0x = reflectX(side === "right" ? bookWidth : 0, 0);
  let u0y = reflectY(side === "right" ? bookWidth : 0, 0);
  let u1x = reflectX(side === "right" ? bookWidth : 0, bookHeight);
  let u1y = reflectY(side === "right" ? bookWidth : 0, bookHeight);

  return { u0x, u0y, u1x, u1y };
}

function calculateRotationAngle(u0x: number, u0y: number, u1x: number, u1y: number): number {
  // Calculate the angle using atan2
  let angle = Math.atan2(u1y - u0y, u1x - u0x);

  // Convert the angle from radians to degrees if necessary
  // angle = angle * 180 / Math.PI;

  // Adjust the angle based on your application's requirements
  // For example, if you need to rotate around a different axis or in a different direction,
  // you might need to modify the angle here.

  return angle;
}

function handlePageTurnCompletion(
  result: CalculateResult,
  side: Side,
  needFinishTurn: boolean,
  z0: number,
  z1: number,
  pageWidth: number,
  bookHeight: number,
  u0x: number,
  u0y: number,
  u1x: number,
  u1y: number
): void {
  if (needFinishTurn) {
    if (side === "right") {
      result.x = 0;
      result.y = 0;
      result.r = 0; // Reset rotation
      // Set coordinates for a completed turn
      result.x1 = 0;
      result.y1 = 0;
      result.x2 = pageWidth;
      result.y2 = 0;
      result.x3 = pageWidth;
      result.y3 = bookHeight;
      result.x4 = 0;
      result.y4 = bookHeight;
    } else {
      // Logic for left side
      result.x = pageWidth;
      result.y = 0;
      result.r = 0; // Reset rotation
      // Set coordinates for a completed turn
      result.x1 = 0;
      result.y1 = 0;
      result.x2 = pageWidth;
      result.y2 = 0;
      result.x3 = pageWidth;
      result.y3 = bookHeight;
      result.x4 = 0;
      result.y4 = bookHeight;
    }
  } else {
    if (z0 === 1) {
      // Handle scenario when z0 is 1
      // Adjust result properties accordingly
    } else if (z1 === 1) {
      // Handle scenario when z1 is 1
      // Adjust result properties accordingly
    } else {
      // Default handling when neither z0 nor z1 is 1
      // Adjust result properties as needed
    }
  }
}

function getStartPositions(side: Side, movementStartX: number, movementStartY: number) {
  let startX = side === "right" ? bookWidth : 0;
  let startY = movementStartY;
  let l = side === "right" ? bookWidth - movementStartX : movementStartX;

  if (l > movementStartY) {
    startX = movementStartX;
    startY = 0;
    l = movementStartY;
  }
  if (l > bookHeight - movementStartY) {
    startX = movementStartX;
    startY = bookHeight;
  }
  if (startX > bookWidth) {
    startX = bookWidth;
  } else if (startX < 0) {
    startX = 0;
  }

  return { startX, startY, l };
}
