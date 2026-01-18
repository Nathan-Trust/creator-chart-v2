import {  HeroSection } from "@/components/home";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <HeroSection />
      <main>{children}</main>
    </div>
  );
};

export default HomeLayout;
