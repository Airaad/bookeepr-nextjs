import React from "react";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";

async function Home() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
    </div>
  );
}

export default Home;
