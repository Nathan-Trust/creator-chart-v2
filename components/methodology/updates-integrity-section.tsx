"use client";

export function UpdatesIntegritySection() {
  return (
    <section className="w-full bg-white section-px py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="mx-auto flex w-full max-w-360 flex-col gap-8 md:flex-row md:gap-12 lg:gap-16">
        {/* Updates & Movement */}
        <div className="flex flex-1 flex-col gap-6">
          <h3 className="text-xl font-semibold text-black leading-tight md:text-2xl lg:text-3xl xl:text-[36px] md:leading-[38.4px] lg:leading-[44px] xl:leading-[48px]">
            Updates & Movement
          </h3>

          <div className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-black opacity-90 md:text-lg lg:text-xl xl:text-[22px] md:leading-[30.6px] lg:leading-[34px] xl:leading-[38px]">
              Charts are updated on a regular schedule. Movement indicators
              (such as ↑ ↓ or New) reflect changes in performance relative to
              the previous period.
            </p>

            <p className="text-base leading-relaxed text-black opacity-90 md:text-lg lg:text-xl xl:text-[22px] md:leading-[30.6px] lg:leading-[34px] xl:leading-[38px]">
              Historical data, such as peak rank and weeks on the chart, are
              preserved to provide context.
            </p>
          </div>
        </div>

        {/* Independence & Integrity */}
        <div className="flex flex-1 flex-col gap-6">
          <h3 className="text-xl font-semibold leading-tight md:text-2xl lg:text-3xl xl:text-[36px] md:leading-[38.4px] lg:leading-[44px] xl:leading-[48px]">
            Independence & Integrity
          </h3>

          <div className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-black opacity-90 md:text-lg lg:text-xl xl:text-[22px] md:leading-[30.6px] lg:leading-[34px] xl:leading-[38px]">
              CreatorCharts operates as an independent index. All rankings are
              generated using the same methodology across countries, categories,
              and platforms.
            </p>

            <p className="text-base leading-relaxed text-black opacity-90 md:text-lg lg:text-xl xl:text-[22px] md:leading-[30.6px] lg:leading-[34px] xl:leading-[38px]">
              Our goal is consistency, transparency, and trust, without
              overcomplication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
