"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { title: "Reliable Sourcing", desc: "Connecting customers with dependable product supply." },
  { title: "Quality Focus", desc: "Maintaining attention to product quality and consistency." },
  { title: "Transparent Business", desc: "Clear communication throughout the trade process." },
  { title: "Diverse Portfolio", desc: "Agricultural, natural, food, industrial, and construction product categories." },
  { title: "Long-Term Partnerships", desc: "Focused on sustainable business relationships rather than one-time transactions." },
];

export default function WhyZafr() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
    <section ref={sectionRef} className="py-24 bg-[#f4f4f4] text-charcoal">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-32">
          
          <div className="md:w-1/3 shrink-0">
            <h2 className="text-4xl md:text-5xl font-bold font-sans uppercase mb-6 sticky top-32 text-charcoal">
              Why Partner <br />With <span className="text-forest">ZAFR?</span>
            </h2>
          </div>
          
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {principles.map((p, i) => (
                <div key={i} className="why-item border-l-2 border-charcoal/10 pl-6 group hover:border-forest transition-colors duration-300">
                  <h4 className="text-xl font-bold font-sans uppercase mb-3 group-hover:text-forest transition-colors text-charcoal">{p.title}</h4>
                  <p className="text-charcoal/70 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
