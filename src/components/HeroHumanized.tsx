"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    title: "Rooted in Quality.",
    subtitle: "Connecting premium agricultural products directly from the source to the world."
  },
  {
    title: "Trusted Worldwide.",
    subtitle: "Built on absolute transparency, ethical practices, and long-term partnerships."
  },
  {
    title: "Value Delivered.",
    subtitle: "Seamless global supply chains powered by human dedication and reliable processes."
  }
];

export default function HeroHumanized() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Text slider logic
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation for text
      gsap.fromTo(
        ".hero-stagger",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.5 }
      );

      // Scroll out parallax
      if (textRef.current && heroRef.current) {
        gsap.to(textRef.current, {
          yPercent: 40,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative w-full h-screen overflow-hidden bg-charcoal bg-[url('/hero-port.jpg')] bg-cover bg-center">
      
      {/* YouTube Background Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-charcoal/20">
        {mounted && (
          <div className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 scale-[1.15] opacity-80">
            <iframe
              src="https://www.youtube.com/embed/wQMx7wc4jh8?autoplay=1&mute=1&loop=1&playlist=wQMx7wc4jh8&controls=0&playsinline=1&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3"
              className="w-full h-full pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="ZAFR Background Video"
              style={{ border: 'none' }}
            ></iframe>
          </div>
        )}
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-charcoal/40 mix-blend-multiply"></div>
      </div>

      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-charcoal/90 via-charcoal/40 to-transparent"></div>
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90"></div>

      {/* Foreground Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center container mx-auto px-6 md:px-12 pointer-events-none">
        <div ref={textRef} className="max-w-4xl w-full">
          
          {/* Massive Hero Logo (Natural Aspect Ratio) */}
          <div className="hero-stagger mb-6 w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[650px] xl:max-w-[750px]">
            <Image 
              src="/logo-exact.png" 
              alt="ZAFR Global Exports" 
              width={1000}
              height={300}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <div className="hero-stagger relative h-[100px] md:h-[140px] lg:h-[180px] mb-4">
             {slides.map((slide, index) => (
               <h1 
                 key={`title-${index}`} 
                 className={`absolute top-0 left-0 text-4xl md:text-6xl lg:text-7xl font-bold font-sans text-white leading-[1.1] max-w-4xl tracking-tight transition-all duration-1000 ease-in-out uppercase ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
               >
                 {slide.title.split('.')[0]}<span className="text-forest font-bold">.</span><br />
                 <span className="text-2xl md:text-4xl lg:text-5xl text-white/90">{index === 0 ? "Trusted Worldwide." : index === 1 ? "Built on Partnerships." : "Rooted in Quality."}</span>
               </h1>
             ))}
          </div>
          
          <div className="hero-stagger relative h-20 md:h-16 mb-10">
             {slides.map((slide, index) => (
               <p 
                 key={`subtitle-${index}`} 
                 className={`absolute top-0 left-0 text-lg md:text-xl text-white/80 max-w-xl font-medium leading-relaxed tracking-wide transition-all duration-1000 ease-in-out delay-100 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
               >
                 {slide.subtitle}
               </p>
             ))}
          </div>
          
          <div className="hero-stagger flex flex-wrap items-center gap-6 pointer-events-auto">
            <a 
              href="#products" 
              className="group relative px-8 py-4 bg-forest text-white font-bold tracking-wide uppercase text-sm overflow-hidden transition-all hover:bg-forest/90"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Products
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </a>
            
            <a 
              href="#contact" 
              className="px-6 py-4 border-b border-white/20 text-white uppercase tracking-widest text-sm font-bold hover:border-forest hover:text-forest transition-colors duration-300"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </div>
      
      {/* Slider Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 z-20">
         <div 
           className="h-full bg-forest transition-all duration-[6000ms] ease-linear"
           style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
         ></div>
      </div>
    </section>
  );
}
