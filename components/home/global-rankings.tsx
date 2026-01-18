import React from "react";
import Image from "next/image";

export default function GlobalRankings() {
  return (
    <div className="bg-[#282f43] relative w-full max-w-162.5 p-8 rounded-md overflow-hidden">
      {/* World Map Background */}
      <div className="absolute -right-24 -top-36 h-full w-[80%]  pointer-events-none rounded-lg">
        <Image
          src="/8ad0223ec5c41fa7789dd40b6dddc6904988d8a8.png"
          alt="World Map"
          fill
          className="object-contain object-right"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Title */}
        <h2 className="text-[40px] font-extrabold text-white leading-[1.2] mb-6">
          Global
          <br />
          Rankings
        </h2>

        {/* Subtitle */}
        <p className="text-[14px] font-semibold text-white mb-6">
          EXPANDING COVERAGE ACROSS AFRICA,
          <br />
          EUROPE & NORTH AMERICA
        </p>

        {/* Divider */}
        <div className="h-px bg-white/30 mb-6" />

        {/* Coverage Status */}
        <div className="mb-8">
          <p className="text-[16px] font-bold text-white/70 mb-3">
            COVERAGE STATUS
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#22c55e]" />
              <div className="flex items-center gap-2 text-[16px] text-white">
                <span className="font-medium">Countries live:</span>
                <span className="font-bold">6</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  fill="white"
                />
              </svg>
              <div className="flex items-center gap-2 text-[16px] text-white">
                <span className="font-medium">Required for launch:</span>
                <span className="font-bold">15</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/30 mb-6" />

        {/* What Will Be Ranked */}
        <div>
          <p className="text-[16px] font-bold text-white/70 mb-3">
            WHAT WILL BE RANKED
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
                  fill="white"
                />
              </svg>
              <span className="text-[16px] font-medium text-white">
                Top 10 Global Creators
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                width="20"
                height="20"
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
              <span className="text-[16px] font-medium text-white">
                Top 10 Global Videos
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 mt-12">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <p className="text-white/90 text-sm font-semibold">
              Data Expansion In Progress
            </p>
          </div>
          <p className="text-white/50 text-xs leading-relaxed">
            Global rankings activate once sufficient regional data coverage is
            reached
          </p>
        </div>
      </div>
    </div>
  );
}
