"use client";

import React from "react";
import {
  TermsHeroSection,
  TermsContentSection,
} from "@/components/legal/terms";

const TermsClient = () => {
  return (
    <div className="min-h-screen">
      <TermsHeroSection />
      <TermsContentSection />
    </div>
  );
};

export default TermsClient;
