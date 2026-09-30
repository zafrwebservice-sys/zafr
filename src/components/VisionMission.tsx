"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VisionMission() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vision-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="vision" ref={sectionRef} className="py-24 md:py-32 bg-white text-charcoal relative border-t border-charcoal/10">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          <div className="vision-item bg-[#fcfaf5] p-10 md:p-14 border border-charcoal/10">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[2px] bg-forest block"></span>
              <span className="text-forest uppercase tracking-widest text-sm font-bold">Our Vision</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold font-sans uppercase mb-6 text-charcoal">
              To Be The Most Reliable <br /><span className="text-forest">Global Export Partner</span>
            </h3>
            <p className="text-charcoal/70 leading-relaxed text-lg font-medium">
              We envision ZAFR Global Exports as the benchmark for quality and reliability in international trade, creating seamless connections between Indian producers and global markets through absolute transparency.
            </p>
          </div>

          <div className="vision-item bg-[#fcfaf5] p-10 md:p-14 border border-charcoal/10">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[2px] bg-forest block"></span>
              <span className="text-forest uppercase tracking-widest text-sm font-bold">Our Mission</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold font-sans uppercase mb-6 text-charcoal">
              Delivering Value <br /><span className="text-forest">Without Compromise</span>
            </h3>
            <p className="text-charcoal/70 leading-relaxed text-lg font-medium">
              Our mission is to consistently supply high-quality agricultural and industrial products while maintaining ethical business standards, ensuring our partners receive exactly what they expect, on time, every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
