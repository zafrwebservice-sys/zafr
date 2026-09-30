"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import HeroHumanized from "@/components/HeroHumanized";
import About from "@/components/About";
import WhyZafr from "@/components/WhyZafr";
import Products from "@/components/Products";
import VisionMission from "@/components/VisionMission";
import Process from "@/components/Process";
import ContainerSection from "@/components/ContainerSection";
import Contact from "@/components/Contact";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <HeroHumanized />
        <About />
        <WhyZafr />
        <Products />
        <VisionMission />
        <Process />
        <Contact />
      </div>
    </>
  );
}
