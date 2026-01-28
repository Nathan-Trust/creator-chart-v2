"use client";

import React from "react";
import {
  MethodologyHeroSection,
  CorePrinciplesSection,
  WhatWeConsiderSection,
  WhatWeDontDoSection,
  UpdatesIntegritySection,
} from "@/components/methodology";

const MethodologyClient = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-black">
        <MethodologyHeroSection />
      </div>
      <CorePrinciplesSection />
      <WhatWeConsiderSection />
      <WhatWeDontDoSection />
      <UpdatesIntegritySection />
    </div>
  );
};

export default MethodologyClient;
