"use client";

export function TermsHeroSection() {
  return (
    <section className="w-full border-b border-[#333] bg-black section-px py-16 md:py-20 lg:py-24 xl:py-[120px]">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Heading */}
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:mb-8 md:text-5xl md:leading-tight lg:text-[56px] lg:leading-[61.6px] lg:tracking-[-2px]">
          Terms of Service
        </h1>

        {/* Description */}
        <p className="mb-6 text-lg leading-8 text-white opacity-90 md:mb-8 md:text-xl md:leading-8">
          Welcome to CreatorCharts. These Terms of Service (&quot;Terms&quot;)
          govern your access to and use of the CreatorCharts platform, website,
          and services.
        </p>

        {/* Last Updated */}
        <p className="text-sm leading-relaxed text-zinc-400 md:text-base md:leading-[25.6px]">
          Last updated: Feb 2026
        </p>
      </div>
    </section>
  );
}
