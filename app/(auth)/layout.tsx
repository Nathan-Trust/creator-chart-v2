import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex bg-[#f5f7fb]">
      {/* Left Panel - Hero Image */}
      <div className="hidden lg:block relative w-[45%] xl:w-[40%] h-screen overflow-hidden">
        <Image
          src="/auth/564ec1b89a4b67e7a7de9f44479e8b55d081369a.png"
          alt="Modern Architecture"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(15,23,42,0.6)] to-[rgba(15,23,42,0.3)]" />

        {/* Logo Badge */}
        <div className="absolute top-8 left-8 z-10">
          <Link
            href="/"
            className="w-[160px] h-[25px] md:w-[220px] md:h-[34px] lg:w-[250px] lg:h-[39px] relative block"
          >
            <Image
              src="/c92443c27a28162617afdb8db0f8fd1536e11ea0.png"
              alt="CreatorCharts"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        {/* Optional: Quote or Text Overlay at bottom */}
        <div className="absolute bottom-12 left-12 right-12 z-10 text-white">
          <blockquote className="text-2xl font-medium leading-relaxed mb-4">
            &quot;Where creator influence is ranked, not guessed.&quot;
          </blockquote>
          <p className="text-sm opacity-80">© {new Date().getFullYear()} CreatorCharts</p>
        </div>
      </div>

      {/* Right Panel - Form Content */}
      <div className="flex-1 flex flex-col h-screen overflow-auto">
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-16">
          <div className="w-full max-w-[600px] mx-auto">
            {/* Mobile Logo (visible only on small screens) */}
            <div className="lg:hidden mb-8 flex justify-center">
              <Link href="/">
                <div className="bg-[#1a2332] text-white px-4 py-2 rounded-md font-bold text-sm tracking-wider uppercase">
                  CREATOR CHARTS
                </div>
              </Link>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
