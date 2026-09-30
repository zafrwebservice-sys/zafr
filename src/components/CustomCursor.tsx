"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    // Only initialize custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 });

    let xToCursor = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
    let yToCursor = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });
    
    let xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    let yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    const addHoverClass = () => {
      gsap.to(cursor, { scale: 1.5, backgroundColor: "rgba(192, 169, 105, 0.2)", border: "1px solid #c0a969", duration: 0.3 });
    };

    const removeHoverClass = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "transparent", border: "1px solid rgba(245, 243, 233, 0.5)", duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll("a, button, input, textarea, select");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", addHoverClass);
      el.addEventListener("mouseleave", removeHoverClass);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", addHoverClass);
        el.removeEventListener("mouseleave", removeHoverClass);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="custom-cursor fixed top-0 left-0 w-8 h-8 rounded-full border border-ivory/50 pointer-events-none z-[9999] mix-blend-difference hidden md:block" 
      />
      <div 
        ref={dotRef} 
        className="custom-cursor fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block" 
      />
    </>
  );
}
