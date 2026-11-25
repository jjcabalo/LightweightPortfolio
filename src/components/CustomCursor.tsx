"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 450, damping: 32, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 450, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, select, .cursor-crosshair"
      );
      setIsHovering(Boolean(interactive));
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block mix-blend-difference">
      {/* Outer ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          width: isHovering ? 44 : 28,
          height: isHovering ? 44 : 28,
          scale: isPressed ? 0.8 : 1,
          borderWidth: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ffffff]"
      />
      {/* Center dot */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          scale: isPressed ? 1.8 : isHovering ? 0.5 : 1,
        }}
        transition={{ duration: 0.12 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#ffffff]"
      />
    </div>
  );
}
