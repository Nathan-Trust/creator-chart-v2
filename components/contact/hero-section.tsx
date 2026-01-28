"use client";

export function ContactHeroSection() {
  return (
    <div className="flex flex-col items-start border-b border-[rgba(0,0,0,0.08)] bg-white px-4 md:px-6 lg:px-14 pb-16 pt-12 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20 xl:pb-[129px] xl:pt-[95px]">
      <div className="w-full max-w-360 mx-auto">
        <div className="flex flex-col gap-6 px-4 md:px-8 lg:px-8">
          {/* Main Heading */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-[-1.5px] text-[#0f1724] md:text-5xl lg:text-[56px] lg:leading-[61.6px]">
            Get in touch
          </h1>

          {/* Description */}
          <div className="max-w-[720px]">
            <p className="text-xl leading-[33.6px] text-[#0f1724] md:text-2xl lg:text-[24px]">
              We&apos;re here to help with questions about our data,
              methodology,
              <br />
              or partnership opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
