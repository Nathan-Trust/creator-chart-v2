"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/lib/stores/theme-store";
import Image from "next/image";

export default function Footer() {
  const { backgroundColor } = useThemeStore();

  return (
    <footer
      className="w-full py-16 section-px transition-colors duration-1000"
      style={{ backgroundColor }}
    >
      <div className="max-w-360 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-6">
 <Link
              href="/"
              className="w-[160px] h-[25px] md:w-[220px] md:h-[34px] lg:w-[250px] lg:h-[39px] relative block"
            >
              <Image
                src="/c92443c27a28162617afdb8db0f8fd1536e11ea0.png"
                alt="CreatorCharts"
                fill
                className="object-contain"
              />
            </Link>            <p className="text-white/70 text-sm leading-relaxed">
              CreatorCharts is a global performance index that tracks and ranks creators based on real performance.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg" />
              <div className="w-10 h-10 bg-white/10 rounded-lg" />
              <div className="w-10 h-10 bg-white/10 rounded-lg" />
              <div className="w-10 h-10 bg-white/10 rounded-lg" />
            </div>
          </div>

          {/* Charts Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">CHARTS</h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link
                  href="/creators/top"
                  className="hover:text-white transition-colors"
                >
                  Top Creators
                </Link>
              </li>
              <li>
                <Link
                  href="/creators/trending"
                  className="hover:text-white transition-colors"
                >
                  Trending Creators
                </Link>
              </li>
              <li>
                <Link
                  href="/videos/top"
                  className="hover:text-white transition-colors"
                >
                  Top Videos
                </Link>
              </li>
              <li>
                <Link
                  href="/videos/viral"
                  className="hover:text-white transition-colors"
                >
                  Viral Videos
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">COMPANY</h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="hover:text-white transition-colors"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="max-w-xl">
            <h3 className="text-white font-bold text-lg mb-2">STAY UPDATED</h3>
            <p className="text-white/70 mb-4">
              Get weekly chart updates and creator highlights.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="email@example.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-[#14532d] hover:bg-[#14532d]/90 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
