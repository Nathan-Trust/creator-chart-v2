"use client";

import React from "react";
import {
  AboutHeroSection,
  VisionSection,
  GoalsAndMechanismSection,
  FounderSection,
  WhyItMattersSection,
  LookingAheadSection,
} from "@/components/about";

const AboutClient = () => {
  return (
    <div className="min-h-screen bg-white">
      <AboutHeroSection />
      <VisionSection />
      <GoalsAndMechanismSection />
      <FounderSection />
      <WhyItMattersSection />
      <LookingAheadSection />
    </div>
  );
};

export default AboutClient;
