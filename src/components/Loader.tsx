"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fake progress counter
    const counterObj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        setMounted(false);
        onComplete();
      }
    });

    // Animate the progress percentage independently
    gsap.to(counterObj, {
      val: 100,
      duration: 3.2,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.floor(counterObj.val))
    });

    // 1. Slow, premium logo reveal with a slight scale and blur effect
    tl.fromTo(".loader-logo", 
      { opacity: 0, scale: 1.05, filter: "blur(8px)" }, 
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.8, ease: "power3.out" }
    )
    // 2. Animate the progress bar width smoothly
    .fromTo(".progress-bar",
      { width: "0%" },
      { width: "100%", duration: 3.2, ease: "power2.inOut" },
      "-=1.8"
    )
    // 3. Pause briefly at 100% so the user registers the completion
    .to({}, { duration: 0.5 })
    // 4. Smoothly fade and lift the content out
    .to(".loader-content", { opacity: 0, y: -30, duration: 0.8, ease: "power3.inOut" })
    // 5. Cinematic curtain raise with a premium expo ease
    .to(".loader-container", { yPercent: -100, duration: 1.4, ease: "expo.inOut" }, "-=0.3");

    return () => { tl.kill(); };
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div className="loader-container fixed inset-0 z-[1000] bg-charcoal flex flex-col items-center justify-center pointer-events-none">
      <div className="loader-content flex flex-col items-center w-full max-w-5xl px-6 md:px-12">
        
        <div className="loader-logo mb-12 w-full max-w-[380px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[900px]">
          <Image 
            src="/logo-exact.png" 
            alt="ZAFR Global Exports" 
            width={1200}
            height={400}
            className="w-full h-auto object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Premium Progress Indicator */}
        <div className="w-full max-w-[380px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[900px] flex flex-col items-center gap-4">
          <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
            <div className="progress-bar absolute top-0 left-0 h-full bg-forest w-0 rounded-full"></div>
          </div>
          <div className="w-full flex justify-between items-center text-white/40 text-xs tracking-[0.4em] font-medium uppercase font-sans">
            <span>Loading Experience</span>
            <span className="tabular-nums">{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
}
