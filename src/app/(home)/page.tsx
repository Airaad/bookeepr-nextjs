import React from "react";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";

async function page() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
    </div>
  );
}

export default page;
