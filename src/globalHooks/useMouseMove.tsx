// hooks/useMouseMove.ts
import { useState } from "react";

type MousePosition = {
  scale: number;
};

const useMouseMove = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ scale: 1 });

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const distanceX = Math.abs(clientX - width / 2);
    const distanceY = Math.abs(clientY - height / 2);
    const scale = 1 + (distanceX / width + distanceY / height) * 0.025;
    setMousePosition({ scale });
  };

  return { mousePosition, handleMouseMove };
};

export default useMouseMove;
