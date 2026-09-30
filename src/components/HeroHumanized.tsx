"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    image: "/hero-port.jpg", // Farmer / Agriculture
    title: "Rooted in Quality.",
    subtitle: "Connecting premium agricultural products directly from the source to the world."
  },
  {
    image: "/hero-spices.jpg", // Logistics workers / Harbor
    title: "Trusted Worldwide.",
    subtitle: "Built on absolute transparency, ethical practices, and long-term partnerships."
  },
  {
    image: "/hero-network.jpg", // Business partnership / Trade
    title: "Value Delivered.",
    subtitle: "Seamless global supply chains powered by human dedication and reliable processes."
  }
];

export default function HeroHumanized() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Premium Background slider logic using GSAP clip-path
  useEffect(() => {
    let ctx = gsap.context(() => {}); // create context for cleanup
    
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      const currentImg = imageRefs.current[currentSlide];
      const nextImg = imageRefs.current[nextSlide];

      if (currentImg && nextImg) {
        ctx.add(() => {
          // Prepare next image
          gsap.set(nextImg, { zIndex: 1, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" });
          
          // Animate next image wiping in from bottom
          gsap.to(nextImg, {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 1.5,
            ease: "power3.inOut",
          });

          // Move current image back
          gsap.set(currentImg, { zIndex: 0 });
        });
      }
      
      setCurrentSlide(nextSlide);
    }, 6000); // 6 seconds per slide

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, [currentSlide]);

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
    <section ref={heroRef} id="home" className="relative w-full h-screen overflow-hidden bg-charcoal">
      
      {/* Background Images with Premium Clip-Path Reveal */}
      {slides.map((slide, index) => (
        <div 
          key={index} 
          ref={el => { imageRefs.current[index] = el }}
          className="absolute inset-0 w-full h-full"
          style={{ 
            zIndex: index === 0 ? 1 : 0, 
            clipPath: index === 0 ? "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
          }}
        >
          <div className="absolute inset-0 bg-charcoal/50 z-10 mix-blend-multiply"></div>
          <Image 
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className={`object-cover transform transition-transform duration-[10000ms] ease-out ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      ))}

      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-charcoal/90 via-charcoal/40 to-transparent"></div>
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90"></div>

      {/* Foreground Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center container mx-auto px-6 md:px-12 pointer-events-none">
        <div ref={textRef} className="max-w-4xl mt-32 md:mt-0 md:pl-8">
          
          <div className="hero-stagger h-[180px] md:h-[260px] lg:h-[300px] relative mb-6 mt-16">
             {slides.map((slide, index) => (
               <h1 
                 key={`title-${index}`} 
                 className={`absolute top-0 left-0 text-5xl md:text-7xl lg:text-8xl font-bold font-sans text-white leading-[1.1] max-w-4xl tracking-tight transition-all duration-1000 ease-in-out uppercase ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
               >
                 {slide.title.split('.')[0]}<span className="text-forest font-bold">.</span><br />
                 <span className="text-3xl md:text-5xl lg:text-6xl text-white/90">{index === 0 ? "Trusted Worldwide." : index === 1 ? "Built on Partnerships." : "Rooted in Quality."}</span>
               </h1>
             ))}
          </div>
          
          <div className="hero-stagger relative h-28 md:h-20 mb-12">
             {slides.map((slide, index) => (
               <p 
                 key={`subtitle-${index}`} 
                 className={`absolute top-0 left-0 text-lg md:text-xl text-white/80 max-w-xl font-medium leading-relaxed tracking-wide transition-all duration-1000 ease-in-out delay-100 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
               >
                 {slide.subtitle}
               </p>
             ))}
          </div>
          
          <div className="hero-stagger flex flex-wrap items-center gap-8 pointer-events-auto">
            <a 
              href="#products" 
              className="group relative px-10 py-4 bg-forest text-white font-bold tracking-wide uppercase text-xs overflow-hidden transition-all hover:bg-forest/90"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Products
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </a>
            
            <a 
              href="#contact" 
              className="px-8 py-4 border-b border-white/20 text-white uppercase tracking-widest text-xs font-bold hover:border-forest hover:text-forest transition-colors duration-300"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </div>
      
      {/* Slider Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 z-20">
         <div 
           className="h-full bg-gold transition-all duration-[6000ms] ease-linear"
           style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
         ></div>
      </div>
    </section>
  );
}
