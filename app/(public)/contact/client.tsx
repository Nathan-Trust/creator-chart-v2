"use client";

import React from "react";
import {
  ContactHeroSection,
  ContactContentSection,
} from "@/components/contact";

const ContactClient = () => {
  return (
    <div className="min-h-screen">
      <ContactHeroSection />
      <ContactContentSection />
    </div>
  );
};

export default ContactClient;
