import React from "react";
import Image from "next/image";

export default function GlobalRankings() {
  return (
    <div className="bg-[#282f43] relative w-full max-w-[650px] p-10 rounded-lg">
      {/* World Map Background */}
      <div className="absolute right-0 top-0 h-[352px] w-[626px] opacity-30 pointer-events-none overflow-hidden">
        <Image
          src="/8ad0223ec5c41fa7789dd40b6dddc6904988d8a8.png"
          alt="World Map"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Title */}
        <h2 className="text-[56px] font-extrabold text-white leading-[1.2] mb-8">
          Global
          <br />
          Rankings
        </h2>

        {/* Subtitle */}
        <p className="text-[16px] font-semibold text-white mb-8">
          EXPANDING COVERAGE ACROSS AFRICA,
          <br />
          EUROPE & NORTH AMERICA
        </p>

        {/* Divider */}
        <div className="h-px bg-white/30 mb-8" />

        {/* Coverage Status */}
        <div className="mb-12">
          <p className="text-[20px] font-bold text-white/70 mb-4">
            COVERAGE STATUS
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 rounded-full bg-[#22c55e]" />
              <div className="flex items-center gap-2 text-[20px] text-white">
                <span className="font-medium">Countries live:</span>
                <span className="font-bold">6</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  fill="white"
                />
              </svg>
              <div className="flex items-center gap-2 text-[20px] text-white">
                <span className="font-medium">Required for launch:</span>
                <span className="font-bold">15</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/30 mb-8" />

        {/* What Will Be Ranked */}
        <div>
          <p className="text-[20px] font-bold text-white/70 mb-4">
            WHAT WILL BE RANKED
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
                  fill="white"
                />
              </svg>
              <span className="text-[20px] font-medium text-white">
                Top 10 Global Creators
              </span>
            </div>
            <div className="flex items-center gap-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 5v14l11-7z"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span className="text-[20px] font-medium text-white">
                Top 10 Global Videos
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
