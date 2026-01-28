"use client";

import React from "react";
import {
  PrivacyPolicyHeroSection,
  PrivacyPolicyContentSection,
} from "@/components/legal/privacy-policy";

const PrivacyPolicyClient = () => {
  return (
    <div className="min-h-screen">
      <PrivacyPolicyHeroSection />
      <PrivacyPolicyContentSection />
    </div>
  );
};

export default PrivacyPolicyClient;
