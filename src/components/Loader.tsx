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
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    )
    .to(".loader-logo-wrapper", { opacity: 0, scale: 1.05, duration: 0.4, ease: "power3.in" }, "+=0.3")
    .to(".loader-container", { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "-=0.2");

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
      </div>
    </div>
  );
}
