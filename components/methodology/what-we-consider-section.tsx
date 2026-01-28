"use client";

export function WhatWeConsiderSection() {
  const considerations = [
    "Growth trends",
    "Engagement signals",
    "Consistency over time",
    "Cross-platform presence",
    "Relative performance within a given period",
  ];

  return (
    <section className="w-full bg-black px-4 md:px-6 lg:px-14 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-360">
        {/* Heading */}
        <div className="mb-8 border-b-2 border-black pb-4 md:mb-10 md:pb-5 lg:mb-12 lg:pb-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl xl:text-[48px] lg:leading-[56px] xl:leading-[60px] lg:tracking-[-1px]">
            What We Consider
          </h2>
        </div>

        {/* Introduction */}
        <p className="mb-8 text-base leading-relaxed text-white opacity-90 md:mb-10 md:text-lg lg:text-xl xl:text-[22px] md:leading-[30.6px] lg:leading-[34px] xl:leading-[38px]">
          CreatorCharts evaluates creators based on a combination of:
        </p>

        {/* List of Considerations */}
        <div className="mb-8 border-t border-zinc-200 md:mb-10 lg:mb-12">
          {considerations.map((item, index) => (
            <div
              key={index}
              className="border-b border-zinc-200 py-5 text-lg font-medium leading-8 text-white opacity-90 md:text-xl lg:text-2xl xl:text-[26px] lg:leading-[34px] xl:leading-[38px]"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-base leading-relaxed text-zinc-600 opacity-90 md:text-lg lg:text-xl xl:text-[22px] md:leading-[30.6px] lg:leading-[34px] xl:leading-[38px]">
          These signals are assessed within specific timeframes (weekly,
          monthly, or longer) to ensure rankings remain current and comparable.
        </p>
      </div>
    </section>
  );
}
