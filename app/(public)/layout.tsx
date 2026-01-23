import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="pt-[70px] ">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
