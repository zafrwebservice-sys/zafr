"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Enquiry & Requirement Gathering", desc: "Understanding specific product requirements, quality standards, and volume needs." },
  { num: "02", title: "Sourcing & Quality Check", desc: "Procuring from verified sources and conducting rigorous quality inspections." },
  { num: "03", title: "Documentation & Compliance", desc: "Managing all export documentation, customs clearance, and international compliance." },
  { num: "04", title: "Logistics & Shipping", desc: "Coordinating secure transportation and global freight forwarding." },
  { num: "05", title: "Delivery & Support", desc: "Ensuring timely arrival and providing ongoing partnership support." }
];

export default function Process() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = scrollRef.current;
      if (!container) return;

      gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: "#process-section",
          start: "top top",
          end: () => `+=${container.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process-section" className="h-screen bg-creme text-charcoal flex flex-col justify-center overflow-hidden border-t border-charcoal/10">
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-sans uppercase mb-4">Our Export Process</h2>
        <p className="text-charcoal/70 max-w-xl font-medium">A systematic, transparent approach to international trade ensuring reliability at every step.</p>
      </div>

      <div className="pl-6 md:pl-12 w-full overflow-hidden">
        <div ref={scrollRef} className="flex gap-8 md:gap-16 w-max pb-12 pr-32">
          {steps.map((step, i) => (
            <div key={i} className="w-[300px] md:w-[400px] shrink-0 group">
              <h3 className="text-xl md:text-2xl font-bold font-sans uppercase mb-4 tracking-wide group-hover:text-forest transition-colors text-charcoal">
                {step.title}
              </h3>
              <p className="text-charcoal/70 leading-relaxed font-medium">
                {step.desc}
              </p>
              <div className="w-0 h-[3px] bg-forest mt-8 transition-all duration-700 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
