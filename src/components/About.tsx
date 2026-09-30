"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal text
      gsap.fromTo(
        ".about-text",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Image parallax & reveal
      gsap.fromTo(
        ".about-image-wrap",
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: ".about-image-wrap",
            start: "top 80%",
          },
        }
      );

      gsap.to(".about-image", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-image-wrap",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      
      // Values reveal
      gsap.fromTo(
        ".value-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".values-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    { title: "Quality", desc: "Carefully sourced products backed by consistent quality standards." },
    { title: "Reliability", desc: "Dependable supply and professional international trade processes." },
    { title: "Transparency", desc: "Clear communication, responsible practices, and transparent business relationships." },
    { title: "Long-Term Value", desc: "Building sustainable partnerships that create lasting value for customers and suppliers." },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-white text-charcoal relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-32">
          <div>
            <div className="about-text flex items-center gap-6 mb-10 opacity-80">
              <span className="w-12 h-[2px] bg-forest block"></span>
              <span className="text-forest uppercase tracking-widest text-[0.8rem] font-bold">Introduction</span>
            </div>
            <h2 className="about-text text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-10 tracking-tight text-charcoal">
              Connecting Quality With <span className="text-forest block mt-2">Global Opportunity</span>
            </h2>
            <p className="about-text text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-xl font-medium tracking-wide">
              ZAFR Global Exports is committed to connecting premium products and reliable opportunities across borders. With a strict focus on sourcing, ethical business practices, and absolute transparency, we create lasting value for all our partners.
            </p>
          </div>
          
          <div className="relative h-[600px] w-full about-image-wrap overflow-hidden bg-[#1a1a1a]">
            {/* Using a placeholder gradient/abstract since we can't load real external images reliably without them breaking, but we will use standard Unsplash architecture/port keywords */}
            <Image 
              src="/about-port.jpg"
              alt="International logistics and shipping containers"
              fill
              className="about-image object-cover scale-125 origin-top"
            />
            <div className="absolute inset-0 bg-charcoal/20 mix-blend-multiply"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="pt-20 border-t border-charcoal/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <h3 className="text-3xl md:text-4xl font-serif text-charcoal">What We Stand For</h3>
            <p className="text-charcoal/70 max-w-sm text-sm font-medium">
              Our core principles guide every international transaction and partnership we build.
            </p>
          </div>
          
          <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {values.map((val, i) => (
              <div key={i} className="value-item group cursor-default">
                <h4 className="text-xl font-bold font-sans uppercase mb-4 group-hover:text-forest transition-colors">{val.title}</h4>
                <p className="text-charcoal/70 text-sm leading-relaxed">{val.desc}</p>
                <div className="w-0 h-[2px] bg-forest mt-6 transition-all duration-500 group-hover:w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
