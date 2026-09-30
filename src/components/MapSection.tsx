"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate lines drawing
      gsap.fromTo(
        ".route-line",
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 60%",
          },
        }
      );

      // Fade in dots
      gsap.fromTo(
        ".destination-dot",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          delay: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 60%",
          },
        }
      );
      
      // Text reveal
      gsap.fromTo(
        ".map-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="reach" ref={sectionRef} className="py-32 bg-[#0a0b0a] relative overflow-hidden text-ivory">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <h2 className="map-text text-4xl md:text-5xl lg:text-7xl font-serif mb-6">
            From India.<br />
            <span className="text-gold italic">Connected to the World.</span>
          </h2>
        </div>

        <div ref={mapRef} className="relative w-full max-w-5xl mx-auto aspect-[2/1] md:aspect-[2.5/1]">
          {/* Abstract Map Visualization */}
          <svg className="w-full h-full opacity-30" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M150,150 Q200,100 250,150 T350,150 T450,180 T550,220 T650,200 T750,180 T850,200" stroke="#F5F3E9" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M700,100 Q750,150 720,200" stroke="#F5F3E9" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M200,250 Q300,280 400,250 T600,250" stroke="#F5F3E9" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Animated Route Lines starting from India (approx position) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* India Origin */}
            <circle cx="700" cy="200" r="6" fill="#c0a969" className="origin-dot" />
            <circle cx="700" cy="200" r="16" stroke="#c0a969" strokeWidth="1" className="origin-pulse animate-ping opacity-50" />
            
            {/* Routes */}
            <path className="route-line" d="M700,200 Q550,100 300,150" stroke="url(#gold-gradient)" strokeWidth="2" strokeLinecap="round" />
            <path className="route-line" d="M700,200 Q650,280 500,280" stroke="url(#gold-gradient)" strokeWidth="2" strokeLinecap="round" />
            <path className="route-line" d="M700,200 Q800,120 900,150" stroke="url(#gold-gradient)" strokeWidth="2" strokeLinecap="round" />
            <path className="route-line" d="M700,200 Q600,150 450,100" stroke="url(#gold-gradient)" strokeWidth="2" strokeLinecap="round" />

            {/* Destinations */}
            <g className="destination-dot">
              <circle cx="300" cy="150" r="4" fill="#F5F3E9" />
              <text x="300" y="135" fill="#F5F3E9" fontSize="12" textAnchor="middle" className="font-sans font-medium opacity-70 tracking-widest uppercase">Global Markets</text>
            </g>
            <g className="destination-dot">
              <circle cx="500" cy="280" r="4" fill="#F5F3E9" />
              <text x="500" y="300" fill="#F5F3E9" fontSize="12" textAnchor="middle" className="font-sans font-medium opacity-70 tracking-widest uppercase">Cross-Border Trade</text>
            </g>
            <g className="destination-dot">
              <circle cx="900" cy="150" r="4" fill="#F5F3E9" />
              <text x="900" y="135" fill="#F5F3E9" fontSize="12" textAnchor="middle" className="font-sans font-medium opacity-70 tracking-widest uppercase">International Partners</text>
            </g>

            <defs>
              <linearGradient id="gold-gradient" x1="700" y1="200" x2="300" y2="150" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c0a969" stopOpacity="0.8" />
                <stop offset="1" stopColor="#c0a969" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* India Label */}
          <div className="absolute top-[55%] left-[71%] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="text-gold font-bold tracking-widest text-sm uppercase">India</span>
          </div>
        </div>
      </div>
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none"></div>
    </section>
  );
}
