import { useEffect, useRef, type FC } from "react";
import type { MouseParallaxProps } from "../Types";

const MouseParallax: FC<MouseParallaxProps> = ({ children, className = "" }) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return;

      const { innerWidth, innerHeight } = window;
      const mouseX = (e.clientX / innerWidth) * 2 - 1;
      const mouseY = (e.clientY / innerHeight) * 2 - 1;

      const elements = sceneRef.current.querySelectorAll<HTMLElement>("[data-depth]");
      elements.forEach((el) => {
        const depth = parseFloat(el.getAttribute("data-depth") || "0");
        const moveX = mouseX * depth * 10;
        const moveY = mouseY * depth * 10;
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={sceneRef} className={className}>
      {children}
    </div>
  );
};

export default MouseParallax;
