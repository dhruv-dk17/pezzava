"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CursorFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 6);
      mouseY.set(e.clientY - 6);

      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") !== null || 
        target.closest("a") !== null
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full border border-primary pointer-events-none z-[9999] hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? "rgba(92, 99, 28, 0.1)" : "transparent",
      }}
      transition={{ scale: { type: "spring", ...springConfig } }}
    />
  );
};
