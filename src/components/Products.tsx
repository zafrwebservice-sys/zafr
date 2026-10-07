"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const agricultureProducts = [
  { name: "Coconut & Derivatives", desc: "Naturally sourced coconuts, powder, and oil selected for quality, freshness, and international supply.", img: "https://static.vecteezy.com/system/resources/previews/068/334/019/large_2x/bottle-of-coconut-oil-with-coconuts-on-a-tropical-beach-background-photo.jpg" },
  { name: "Indian Spices", desc: "Authentic Indian spices sourced for aroma, flavour, consistency, and dependable supply.", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop" },
  { name: "Coffee Products", desc: "Selected Indian coffee products prepared for quality-conscious international markets.", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop" },
  { name: "Fresh Produce", desc: "Fresh fruits and vegetables sourced directly from trusted agricultural networks.", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop" },
];

const industrialProducts = [
  { name: "Construction Materials", desc: "Concrete blocks, cement, and steel reinforcement for international construction requirements.", img: "https://dhinwaconstruction.com/wp-content/uploads/2024/06/hsto.jpg.webp" },
  { name: "Industrial Spare Parts", desc: "Quality spare parts sourced for reliability and industrial consistency.", img: "https://static.vecteezy.com/system/resources/previews/049/606/362/non_2x/assorted-mechanical-parts-and-gears-on-a-workbench-industrial-engineering-and-machinery-components-photo.JPG" },
];

const consumerProducts = [
  { name: "FMCG Products", desc: "Fast-moving consumer goods, including packaged foods and retail-ready consumables, delivered globally.", img: "/fmcg-product.jpg" }
];

export default function Products() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".product-card").forEach((card, i) => {
        gsap.fromTo(card, 
          { y: 50, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 0.8, 
            scrollTrigger: { trigger: card, start: "top 85%" }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={containerRef} className="bg-creme text-charcoal relative z-10 pt-24 pb-24 border-t border-charcoal/5">
      
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 mb-20 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-charcoal">Our Product Portfolio</h2>
        <p className="text-charcoal/70 max-w-2xl mx-auto text-lg">
          From naturally sourced agricultural products to essential industrial materials, ZAFR Global Exports connects diverse Indian products with international markets.
        </p>
      </div>

      {/* Unified Product Grid */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...agricultureProducts, ...industrialProducts, ...consumerProducts].map((prod, i) => (
            <ProductCard key={i} product={prod} />
          ))}
          
          {/* More Products Card */}
          <div className="product-card group relative bg-white border border-charcoal/10 overflow-hidden flex flex-col justify-center items-center text-center p-12 min-h-[400px]">
            <h4 className="text-2xl font-bold font-sans uppercase tracking-wide mb-4 relative z-10 group-hover:text-forest transition-colors">More Products</h4>
            <p className="text-charcoal/60 text-sm max-w-xs relative z-10">
              And more products based on international sourcing requirements.
            </p>
            <div className="mt-8 relative z-10">
              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold uppercase text-forest">
                Enquire Requirements <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <div className="product-card group relative overflow-hidden bg-white border border-charcoal/10 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image 
          src={product.img} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-500"></div>
      </div>
      <div className="p-8 relative">
        <div className="absolute top-0 left-0 w-0 h-[2px] bg-forest transition-all duration-500 group-hover:w-full"></div>
        <h4 className="text-xl font-bold font-sans uppercase tracking-wide mb-3 group-hover:text-forest transition-colors">{product.name}</h4>
        <p className="text-charcoal/70 text-sm leading-relaxed mb-6">
          {product.desc}
        </p>
        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold uppercase text-forest">
          Enquire <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  );
}
