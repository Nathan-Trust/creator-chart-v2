"use client";

import { ArrowUp, ArrowDown } from "lucide-react";

export type TrendMovement =
  | "up"
  | "down"
  | "new"
  | "reentry"
  | "re-entry"
  | "none"
  | "same";

interface TrendBadgeProps {
  /** The movement direction: "up" | "down" | "new" | "reentry" | "none" etc. */
  movement: string;
  /** Numeric change value to display (e.g. +3, -2) */
  change?: number;
  /**
   * Visual variant:
   * - "home": mobile/desktop responsive (for home page widgets)
   * - "listing": single rounded-full pill (for full listing pages)
   */
  variant?: "home" | "listing";
}

/**
 * Reusable trend/rank badge component.
 * Two visual variants:
 * - "home" renders mobile + desktop responsive badges
 * - "listing" renders a single rounded-full pill badge
 */
export function TrendBadge({
  movement,
  change,
  variant = "home",
}: TrendBadgeProps) {
  const m = (movement ?? "none").toLowerCase();

  if (variant === "listing") {
    return <ListingBadge movement={m} change={change} />;
  }

  return <HomeBadge movement={m} change={change} />;
}

// ---------------------------------------------------------------------------
// Home variant – mobile (desktop:hidden) + desktop (hidden desktop:flex)
// ---------------------------------------------------------------------------
function HomeBadge({
  movement,
  change,
}: {
  movement: string;
  change?: number;
}) {
  if (movement === "new") {
    return (
      <>
        <div className="desktop:hidden bg-[#e3f2fd] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
          <span className="text-[#1565c0] text-[10px] font-semibold">New</span>
        </div>
        <div className="hidden desktop:flex bg-[rgba(32,120,236,0.2)] items-center justify-center px-1.5 py-0.5 rounded-[9px]">
          <span className="text-[#2078ec] text-[12px] font-medium">New</span>
        </div>
      </>
    );
  }

  if (movement === "reentry" || movement === "re-entry") {
    return (
      <>
        <div className="desktop:hidden bg-[#e3f2fd] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
          <span className="text-[#1565c0] text-[10px] font-semibold">
            Re-entry
          </span>
        </div>
        <div className="hidden desktop:flex bg-[rgba(32,120,236,0.2)] items-center justify-center px-1.5 py-0.5 rounded-[9px]">
          <span className="text-[#2078ec] text-[12px] font-medium">
            Re-entry
          </span>
        </div>
      </>
    );
  }

  if (movement === "up") {
    return (
      <>
        <div className="desktop:hidden bg-[#e8f5e9] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
          <div className="flex items-center">
            <ArrowUp className="w-2.5 h-2.5 text-[#2e7d32]" strokeWidth={2.5} />
            <span className="text-[#2e7d32] text-[10px] font-semibold">
              +{change}
            </span>
          </div>
        </div>
        <div className="hidden desktop:flex bg-[rgba(35,140,77,0.3)] items-center justify-center px-1.5 py-0.5 rounded-[9px]">
          <div className="flex items-center">
            <ArrowUp className="w-3 h-3 text-[#238c4d]" strokeWidth={2.5} />
            <span className="text-[#238c4d] text-[12px] font-medium">
              +{change}
            </span>
          </div>
        </div>
      </>
    );
  }

  if (movement === "down") {
    return (
      <>
        <div className="desktop:hidden bg-[#ffebee] flex items-center justify-center px-1.5 py-0.5 rounded-[4px]">
          <div className="flex items-center">
            <ArrowDown
              className="w-2.5 h-2.5 text-[#c62828]"
              strokeWidth={2.5}
            />
            <span className="text-[#c62828] text-[10px] font-semibold">
              -{change}
            </span>
          </div>
        </div>
        <div className="hidden desktop:flex bg-[rgba(179,38,30,0.3)] items-center justify-center px-1.5 py-0.5 rounded-[9px]">
          <div className="flex items-center">
            <ArrowDown className="w-3 h-3 text-[#b3261e]" strokeWidth={2.5} />
            <span className="text-[#b3261e] text-[12px] font-medium">
              -{change}
            </span>
          </div>
        </div>
      </>
    );
  }

  // default / "none" / "same"
  return (
    <>
      <div className="desktop:hidden bg-[#eeeeee] flex items-center justify-center px-4 py-0.5 rounded-[4px]">
        <span className="text-[#666666] text-[10px] font-semibold">-</span>
      </div>
      <div className="hidden desktop:flex bg-[rgba(0,0,0,0.2)] items-center justify-center px-3 py-0.5 rounded-[9px]">
        <span className="text-[rgba(0,0,0,0.6)] text-[12px] font-medium">
          -
        </span>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Listing variant – single rounded-full pill
// ---------------------------------------------------------------------------
function ListingBadge({
  movement,
  change,
}: {
  movement: string;
  change?: number;
}) {
  if (movement === "up") {
    return (
      <div className="flex items-center gap-0.5 px-2 py-0.5 bg-[#dcfce7] rounded-full">
        <ArrowUp className="w-3 h-3 text-[#166534]" strokeWidth={2.5} />
        <span className="text-[11px] font-semibold text-[#166534]">
          +{change}
        </span>
      </div>
    );
  }

  if (movement === "new") {
    return (
      <div className="flex items-center gap-0.5 px-2 py-0.5 bg-[#dbeafe] rounded-full">
        <span className="text-[11px] font-semibold text-[#1e40af]">New</span>
      </div>
    );
  }

  if (movement === "reentry" || movement === "re-entry") {
    return (
      <div className="flex items-center gap-0.5 px-2 py-0.5 bg-[#dbeafe] rounded-full">
        <span className="text-[11px] font-semibold text-[#1e40af]">
          Re-entry
        </span>
      </div>
    );
  }

  if (movement === "down") {
    return (
      <div className="flex items-center gap-0.5 px-2 py-0.5 bg-[#fee2e2] rounded-full">
        <ArrowDown className="w-3 h-3 text-[#991b1b]" strokeWidth={2.5} />
        <span className="text-[11px] font-semibold text-[#991b1b]">
          -{change}
        </span>
      </div>
    );
  }

  // default / "none" / "same"
  return (
    <div className="flex items-center gap-0.5 px-2 py-0.5 bg-gray-100 rounded-full">
      <span className="text-[11px] font-semibold text-gray-500">-</span>
    </div>
  );
}
