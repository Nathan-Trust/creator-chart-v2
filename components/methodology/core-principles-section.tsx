"use client";

import { Scale, Lock, Globe2, ShieldCheck } from "lucide-react";

export function CorePrinciplesSection() {
  const principles = [
    {
      icon: Scale,
      title: "Neutrality",
      description:
        "CreatorCharts operates independently of talent agencies and platforms. Rankings are automated based on performance data, not editorial selection.",
    },
    {
      icon: Lock,
      title: "Integrity",
      description:
        "Once a chart is locked and published, it is immutable. We maintain a strict append-only history to ensure the historical record of influence remains tamper-proof.",
    },
    {
      icon: Globe2,
      title: "Universality",
      description:
        "We normalize data across disparate platforms—comparing a YouTube long-form creator with a TikTok short-form creator using a unified scoring language.",
    },
    {
      icon: ShieldCheck,
      title: "Verification",
      description:
        "Only verified entities are eligible for global rankings. We rigorously filter bot activity and engagement farming to surface genuine audience command.",
    },
  ];

  return (
    <section className="w-full bg-white section-px py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Heading */}
        <div className="mb-8 border-b-2 border-black pb-4 md:mb-10 md:pb-5 lg:mb-12 lg:pb-6">
          <h2 className="text-2xl font-bold text-black tracking-tight md:text-3xl lg:text-4xl xl:text-[48px] lg:leading-[56px] xl:leading-[60px] lg:tracking-[-1px]">
            1. Core Principles
          </h2>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-10 lg:gap-x-[64px] lg:gap-y-[64.5px]">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div key={index} className="flex flex-col gap-3 md:gap-[14.89px]">
                {/* Icon and Title */}
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 shrink-0 text-black lg:h-7 lg:w-7" />
                  <h3 className="text-lg font-semibold leading-8 text-black md:text-xl lg:text-2xl xl:text-[28px] lg:leading-[36px]">
                    {principle.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-base leading-relaxed text-black opacity-90 md:text-lg lg:text-xl xl:text-[22px] md:leading-[30.6px] lg:leading-[34px] xl:leading-[38px]">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
