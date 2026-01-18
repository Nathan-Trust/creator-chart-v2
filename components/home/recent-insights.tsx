import React from "react";
import Image from "next/image";

interface Insight {
  title: string;
  description: string;
  date: string;
  image: string;
}

const insights: Insight[] = [
  {
    title: "Most Viewed African Creators in the Last Week",
    description:
      "The performance comparison for major growth trends across TikTok history.",
    date: "APRIL 1, 2025",
    image: "/03a8d9b98d0f357116da4eda6a0e6db96ea785f2.png",
  },
  {
    title: "Emerging Countries for African Comedy Creators",
    description:
      "Trends in comedy creators from small African countries becoming vital.",
    date: "APRIL 1, 2025",
    image: "/ff1b39fe0f246ec57b9fc579c2593fb4facf39ef.png",
  },
];

export default function RecentInsights() {
  return (
    <div className="bg-white relative w-full max-w-[650px] p-10 rounded-lg">
      {/* Title */}
      <h2 className="text-[32px] font-extrabold text-[#111] mb-12">
        Recent Insights
      </h2>

      {/* Insights List */}
      <div className="flex flex-col gap-8 mb-12">
        {insights.map((insight, index) => (
          <div key={index} className="flex gap-[18px] items-start">
            {/* Image */}
            <div className="w-[204px] h-[148px] relative rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={insight.image}
                alt={insight.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="text-[22px] font-bold text-[#111] leading-tight">
                {insight.title}
              </h3>
              <p className="text-[20px] font-medium text-[rgba(17,17,17,0.7)]">
                {insight.description}
              </p>
              <div className="flex items-center gap-6 mt-2">
                <span className="text-[20px] font-bold italic text-[rgba(17,17,17,0.5)]">
                  {insight.date}
                </span>
                <button className="text-[20px] font-extrabold text-[rgba(17,17,17,0.7)] hover:text-[#111] transition-colors">
                  READ MORE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex items-center justify-center gap-4">
        <button className="text-[20px] font-extrabold text-[rgba(17,17,17,0.7)] hover:text-[#111] transition-colors flex items-center gap-4">
          VIEW ALL INSIGHTS
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180"
          >
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
