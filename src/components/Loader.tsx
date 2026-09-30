"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setMounted(false);
        onComplete();
      }
    });

    tl.fromTo(".loader-logo", 
      { y: 30, opacity: 0, scale: 0.95 }, 
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    )
    .to(".loader-progress", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, "-=0.5")
    .to(".loader-logo-wrapper", { opacity: 0, y: -20, duration: 0.8, ease: "power3.in" }, "+=0.2")
    .to(".loader-container", { yPercent: -100, duration: 1.2, ease: "power4.inOut" }, "-=0.4");

    return () => { tl.kill(); };
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div className="loader-container fixed inset-0 z-[1000] bg-charcoal flex flex-col items-center justify-center pointer-events-none">
      <div className="loader-logo-wrapper flex flex-col items-center">
        <div className="loader-logo mb-10 relative w-64 h-24 overflow-hidden">
          <Image 
            src="/logo-exact.png" 
            alt="ZAFR Global Exports" 
            fill 
            className="object-contain"
            priority
          />
        </div>
        <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden">
          <div className="loader-progress absolute inset-0 bg-gold origin-left scale-x-0"></div>
        </div>
      </div>
    </div>
  );
}
