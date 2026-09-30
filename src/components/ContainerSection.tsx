"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ContainerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".container-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      
      gsap.fromTo(
        ".trade-text",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop"
          alt="Container terminal"
          fill
          className="container-bg object-cover scale-125 origin-top opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-4xl">
        <h2 className="trade-text text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
          Built for <span className="text-gold italic">Global Trade</span>
        </h2>
        <p className="trade-text text-lg md:text-xl text-ivory/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          "From carefully sourced products to international shipment, ZAFR Global Exports focuses on dependable processes, transparent communication, and value-driven trade."
        </p>
        <div className="trade-text">
          <Link href="#contact" className="inline-block px-8 py-4 bg-gold text-charcoal font-semibold hover:bg-gold-light transition-colors transform hover:scale-105 duration-300">
            Start an Enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
