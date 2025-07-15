import React from "react";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

async function page() {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <FeatureSection />
      <Footer/>
    </div>
  );
}

export default page;
