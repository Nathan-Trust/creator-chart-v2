"use client";

export function PrivacyPolicyHeroSection() {
  return (
    <section className="w-full border-b border-[#333] bg-black px-4 md:px-6 lg:px-14 py-16 md:py-20 lg:py-24 xl:py-[120px]">
      <div className="mx-auto w-full max-w-360">
        {/* Heading */}
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:mb-8 md:text-5xl md:leading-tight lg:text-[56px] lg:leading-[61.6px] lg:tracking-[-2px]">
          Privacy Policy
        </h1>

        {/* Description */}
        <p className="mb-6 text-lg leading-8 text-white opacity-90 md:mb-8 md:text-xl md:leading-8">
          CreatorCharts (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) values
          your privacy and is committed to protecting your personal information.
        </p>

        {/* Last Updated */}
        <p className="text-sm leading-relaxed text-zinc-400 md:text-base md:leading-[25.6px]">
          Last updated: Feb 2026
        </p>
      </div>
    </section>
  );
}
