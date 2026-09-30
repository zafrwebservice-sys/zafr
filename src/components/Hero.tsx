"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Hero3DGlobe from "./Hero3DGlobe";
import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.fromTo(
        ".hero-stagger",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
      );

      // Scroll out animation
      gsap.to(heroTextRef.current, {
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -150,
        opacity: 0,
      });
    }, heroTextRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-charcoal">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none md:pointer-events-auto">
        <Suspense fallback={<div className="w-full h-full bg-charcoal" />}>
          <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
            <ScrollControls pages={3} damping={0.25}>
              <Hero3DGlobe />
            </ScrollControls>
          </Canvas>
        </Suspense>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center container mx-auto px-6 md:px-12 pointer-events-none">
        <div ref={heroTextRef} className="max-w-5xl mt-32 md:mt-0 md:pl-8">
          <div className="hero-stagger flex items-center gap-6 mb-8 opacity-90">
            <span className="w-12 h-[1px] bg-gold block"></span>
            <span className="text-gold uppercase tracking-[0.3em] text-[0.7rem] font-bold">Global Exports • India</span>
          </div>
          
          <h1 className="hero-stagger text-5xl md:text-7xl lg:text-8xl font-serif text-ivory leading-[1.05] mb-8 max-w-4xl tracking-tight">
            Rooted in <span className="text-gold italic font-light pr-4">Quality.</span><br />
            Trusted Worldwide.
          </h1>
          
          <p className="hero-stagger text-lg md:text-xl text-ivory/60 max-w-xl font-light mb-12 leading-relaxed tracking-wide">
            Connecting premium Indian products with opportunities across global markets through reliable sourcing and transparent trade.
          </p>
          
          <div className="hero-stagger flex flex-wrap items-center gap-8 pointer-events-auto">
            <Link 
              href="#products" 
              className="group relative px-10 py-4 bg-gold text-charcoal font-semibold tracking-wide uppercase text-xs overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(192,169,105,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Products
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0"></div>
            </Link>
            
            <Link 
              href="#contact" 
              className="px-8 py-4 border-b border-white/20 text-ivory uppercase tracking-widest text-xs font-semibold hover:border-gold hover:text-gold transition-colors duration-300"
            >
              Partner With Us
            </Link>
          </div>
          
          <div className="hero-stagger absolute bottom-12 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 pointer-events-auto">
            <Link href="#about" className="flex flex-col items-center md:items-start gap-3 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/40 hover:text-gold transition-colors group">
              <span className="writing-vertical-rl md:writing-horizontal-tb">Scroll to discover</span>
              <span className="w-[1px] h-12 md:w-12 md:h-[1px] bg-ivory/20 group-hover:bg-gold transition-colors relative overflow-hidden">
                <span className="absolute top-0 left-0 w-full h-full bg-gold transform -translate-y-full md:-translate-y-0 md:-translate-x-full group-hover:translate-y-0 md:group-hover:translate-x-0 transition-transform duration-700"></span>
              </span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Refined Cinematic Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-charcoal/80 via-transparent to-transparent"></div>
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80"></div>
    </section>
  );
}
