"use client";

export function WhatWeDontDoSection() {
  const restrictions = [
    "Rankings cannot be bought or influenced",
    "Creators cannot submit data manually",
    "No private or insider data is used",
    "No single platform determines ranking position",
  ];

  return (
    <section className="w-full bg-black px-4 md:px-6 lg:px-14 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-360">
        {/* Heading */}
        <div className="mb-8 border-b-2 border-white pb-4 md:mb-10 md:pb-5 lg:mb-12 lg:pb-6">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl xl:text-[48px] lg:leading-[56px] xl:leading-[60px] lg:tracking-[-1px]">
            What We Don&apos;t Do
          </h2>
        </div>

        {/* List of Restrictions */}
        <div className="mb-8 border-t border-[#333] md:mb-10 lg:mb-12">
          {restrictions.map((item, index) => (
            <div
              key={index}
              className="border-b border-[#333] py-5 text-lg font-medium leading-8 text-white opacity-90 md:text-xl lg:text-2xl xl:text-[26px] lg:leading-[34px] xl:leading-[38px]"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-base leading-relaxed text-zinc-400 opacity-90 md:text-lg lg:text-xl xl:text-[22px] md:leading-[30.6px] lg:leading-[34px] xl:leading-[38px]">
          CreatorCharts does not favor creators based on popularity alone —
          performance over time is what matters.
        </p>
      </div>
    </section>
  );
}
