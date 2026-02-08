"use client";

import React from "react";
import { BarChart3, Target, Users } from "lucide-react";

const goalsData = [
  {
    title: "Neutral Standard",
    description:
      "Create a neutral standard for measuring creator performance across platforms.",
    icon: BarChart3,
    color: "bg-[rgba(34,197,94,0.1)]",
    iconColor: "text-[#22c55e]",
  },
  {
    title: "Early Detection",
    description:
      "Surface rising creators early, before mainstream attention catches up.",
    icon: Target,
    color: "bg-[rgba(34,197,94,0.1)]",
    iconColor: "text-[#22c55e]",
  },
  {
    title: "Clarity for All",
    description:
      "Provide clarity for brands, agencies, and fans navigating the creator economy.",
    icon: Users,
    color: "bg-[rgba(34,197,94,0.1)]",
    iconColor: "text-[#22c55e]",
  },
];

const stepsData = [
  {
    number: "1",
    title: "Aggregate Data",
    description: "Cross-platform signals collected daily",
    bgColor: "bg-[#0f1724]",
  },
  {
    number: "2",
    title: "Calculate CPI",
    description: "Apply weighted algorithms for fairness",
    bgColor: "bg-[#0f1724]",
  },
  {
    number: "3",
    title: "Publish Rankings",
    description: "Verified global & category charts",
    bgColor: "bg-[#0369a1]",
  },
];

export default function GoalsAndMechanismSection() {
  return (
    <div className="bg-white border-b border-[rgba(0,0,0,0.08)] flex flex-col items-center py-12 md:py-16 lg:py-20 xl:py-24 section-px w-full">
      <div className="max-w-360 mx-auto w-full space-y-12 md:space-y-16">
        {/* Our Goals Section */}
        <div className="space-y-6 md:space-y-8">
          {/* Header */}
          <div className="max-w-[600px] space-y-4 md:space-y-6">
            <h2 className="font-bold text-3xl md:text-4xl lg:text-[48px] xl:text-[52px] text-[#0f1724] tracking-tight lg:tracking-[-1px] leading-tight lg:leading-[60px] xl:leading-[64px]">
              Our Goals
            </h2>
            <p className="font-normal text-base md:text-[18px] lg:text-xl xl:text-[22px] text-[#4b5563] leading-relaxed lg:leading-[34px] xl:leading-[38px]">
              Every chart, every score, and every movement on CreatorCharts is
              designed to reflect real performance over time.
            </p>
          </div>

          {/* Goals Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {goalsData.map((goal, index) => {
              const IconComponent = goal.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-6 md:p-8 space-y-4 md:space-y-6"
                >
                  <div
                    className={`${goal.color} ${goal.iconColor} w-12 h-12 rounded-[10px] flex items-center justify-center`}
                  >
                    <IconComponent className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <h3 className="font-semibold text-lg md:text-xl lg:text-2xl xl:text-[26px] text-[#0f1724] leading-tight lg:leading-[34px] xl:leading-[38px]">
                      {goal.title}
                    </h3>
                    <p className="font-normal text-base md:text-[18px] lg:text-xl xl:text-[22px] text-[#4b5563] leading-relaxed lg:leading-[34px] xl:leading-[38px]">
                      {goal.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-20 pt-4">
          {/* Left Content */}
          <div className="flex-1 space-y-4 md:space-y-6">
            <h2 className="font-bold text-3xl md:text-4xl lg:text-[48px] xl:text-[52px] text-[#0f1724] tracking-tight lg:tracking-[-1px] leading-tight lg:leading-[60px] xl:leading-[64px]">
              How It Works
            </h2>

            <div className="space-y-4 md:space-y-6 max-w-[478px]">
              <p className="font-normal text-base md:text-[18px] lg:text-xl xl:text-[22px] text-[#4b5563] leading-relaxed lg:leading-[34px] xl:leading-[38px]">
                CreatorCharts aggregates publicly available performance signals
                across multiple platforms and translates them into a unified
                metric known as{" "}
                <span className="font-bold text-[#0f1724]">
                  CPI (Creator Performance Index)
                </span>
                .
              </p>

              <p className="font-normal text-base md:text-[18px] lg:text-xl xl:text-[22px] text-[#4b5563] leading-relaxed lg:leading-[34px] xl:leading-[38px]">
                CPI reflects overall creator momentum, consistency, and growth —
                allowing creators from different platforms and regions to be
                compared fairly.
              </p>

              <p className="font-normal text-base md:text-[18px] lg:text-xl xl:text-[22px] text-[#4b5563] leading-relaxed lg:leading-[34px] xl:leading-[38px]">
                Rankings update regularly, making CreatorCharts a living
                snapshot of the creator landscape.
              </p>
            </div>
          </div>

          {/* Right Content - Steps */}
          <div className="flex-1">
            <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-6 md:p-8 space-y-8 md:space-y-12">
              {stepsData.map((step, index) => (
                <div key={index}>
                  <div className="flex items-start gap-4 md:gap-6">
                    <div
                      className={`${step.bgColor} text-white w-9 h-9 lg:w-11 lg:h-11 rounded-[18px] flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="font-bold text-base lg:text-lg xl:text-xl leading-tight">
                        {step.number}
                      </span>
                    </div>
                    <div className="flex-1 pt-0.5">
                      <h4 className="font-semibold text-base lg:text-lg xl:text-xl text-[#0f1724] mb-1 leading-tight lg:leading-[30px] xl:leading-[32px]">
                        {step.title}
                      </h4>
                      <p className="font-normal text-sm md:text-[15px] lg:text-base xl:text-lg text-[#4b5563] leading-relaxed lg:leading-[28px] xl:leading-[32px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < stepsData.length - 1 && (
                    <div className="ml-[18px] lg:ml-[22px] mt-3 mb-3 w-0.5 h-8 bg-[rgba(0,0,0,0.08)]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
