import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameRef = useRef<number>();
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Smooth animation loop using requestAnimationFrame
    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.2;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.2;

      setMousePos({
        x: currentPos.current.x,
        y: currentPos.current.y,
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.classList.contains("interactive") ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".interactive") ||
        target.closest("[role='button']") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA";

      if (interactive) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.classList.contains("interactive") ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".interactive") ||
        target.closest("[role='button']") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA";

      if (interactive) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
        width: "28px",
        height: "28px",
        transform: isHovering
          ? "translate(-50%, -50%) scale(1.8)"
          : "translate(-50%, -50%) scale(1)",
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        background: isHovering
          ? "radial-gradient(circle, hsl(var(--primary)), hsl(var(--primary) / 0.4))"
          : "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.2))",
        backdropFilter: isHovering ? "blur(8px)" : "blur(4px)",
        borderRadius: "50%",
        boxShadow: isHovering
          ? `0 0 30px hsl(var(--primary)), 0 0 60px hsl(var(--primary) / 0.5), inset 0 0 20px hsl(var(--primary) / 0.3)`
          : `0 0 15px hsl(var(--primary)), inset 0 0 10px hsl(var(--primary) / 0.2)`,
        border: isHovering
          ? "2px solid hsl(var(--primary) / 0.6)"
          : "1px solid hsl(var(--primary) / 0.4)",
        willChange: "transform, box-shadow",
      }}
    >
      {/* Inner rotating ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: isHovering
            ? "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--primary) / 0.2), hsl(var(--primary)))"
            : "conic-gradient(from 0deg, hsl(var(--primary) / 0.4), transparent, hsl(var(--primary) / 0.1))",
          animation: isHovering ? "spin 1.5s linear infinite" : "spin 3s linear infinite",
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />

      {/* Center dot */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: isHovering ? "8px" : "4px",
          height: isHovering ? "8px" : "4px",
          backgroundColor: "hsl(var(--primary))",
          transform: "translate(-50%, -50%)",
          boxShadow: `0 0 ${isHovering ? "16px" : "8px"} hsl(var(--primary))`,
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />
    </div>
  );
}
