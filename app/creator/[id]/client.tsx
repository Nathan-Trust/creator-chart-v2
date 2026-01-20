"use client";

import { useState, useEffect } from "react";
import {
  Check,
  CheckCheck,
  CheckCircle2,
  Dot,
  TrendingUp,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import { FastAverageColor } from "fast-average-color";
import { useThemeStore } from "@/lib/stores/theme-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChartsTable from "@/components/creator/charts-table";
import VideosTable from "@/components/creator/videos-table";
import MilestonesTable from "@/components/creator/milestones-table";

// SVG assets as data URIs
const imgSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M8 5v14l11-7z' fill='white'/%3E%3C/svg%3E";
const imgSvg1 =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'%3E%3Cpath fill='%23f6f4f2' fill-opacity='1' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E";
const imgGroup =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14z' fill='%23E0E0E0'/%3E%3Cpath d='M4.5 7l2 2 3-4' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
const imgSvg2 =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M11.083 10.5L7 6.417 2.917 10.5 1.5 9.083 5.583 5 1.5 .917 2.917-.5 7 3.583 11.083-.5l1.417 1.417L8.417 5l4.083 4.083-1.417 1.417z' fill='%23222'/%3E%3C/svg%3E";
const imgSvg3 =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M11.013 2.154a.75.75 0 0 1 .832.832l-.464 2.786 2.786-.464a.75.75 0 0 1 .832.832l-.464 2.786a.75.75 0 0 1-.832.832l-2.786-.464.464 2.786a.75.75 0 0 1-.832.832l-2.786-.464.464 2.786a.75.75 0 0 1-.832.832l-2.786-.464-2.786.464a.75.75 0 0 1-.832-.832l.464-2.786-2.786.464a.75.75 0 0 1-.832-.832l.464-2.786L1.513 8.92a.75.75 0 0 1 .832-.832l2.786.464-.464-2.786a.75.75 0 0 1 .832-.832l2.786.464-.464-2.786a.75.75 0 0 1 .832-.832l2.786.464 2.786-.464z' fill='white'/%3E%3C/svg%3E";
const imgGroup2 =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M9 0C4.037 0 0 4.037 0 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9zm3.68 12.408c-.146.24-.408.37-.682.37a.863.863 0 0 1-.44-.122c-.75-.436-1.69-.675-2.716-.675-.574 0-1.166.072-1.757.215a.858.858 0 0 1-1.025-.645.857.857 0 0 1 .644-1.024c.714-.173 1.43-.26 2.138-.26 1.284 0 2.462.295 3.5.876.478.267.644.873.338 1.265z' fill='%23666'/%3E%3C/svg%3E";
const imgSvg4 =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M9 0C4.037 0 0 4.037 0 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9zm4.1 6.522l-5.07 7.297c-.13.187-.344.297-.57.297-.127 0-.256-.035-.37-.107a.694.694 0 0 1-.223-.956l5.07-7.296c.176-.253.524-.316.777-.14.253.175.316.523.14.776-.001 0-.001 0 0 0l.246.129z' fill='%23666'/%3E%3C/svg%3E";
const imgGroup3 =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M17.12 6.76a9.004 9.004 0 0 0-16.24 0l-.28.6v3.28l.28.6a9.004 9.004 0 0 0 16.24 0l.28-.6V7.36l-.28-.6zM9 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill='%23666'/%3E%3C/svg%3E";
const imgGroup4 =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M9 0C4.037 0 0 4.14 0 9.25c0 4.093 2.635 7.565 6.287 8.788.46.085.628-.2.628-.446 0-.22-.008-.802-.013-1.575-2.56.558-3.1-1.236-3.1-1.236-.418-1.065-1.021-1.348-1.021-1.348-.835-.57.063-.559.063-.559.923.065 1.409.949 1.409.949.82 1.407 2.152 1.001 2.676.765.083-.595.321-1.001.583-1.231-2.042-.232-4.189-1.022-4.189-4.549 0-1.005.358-1.826.946-2.47-.095-.232-.41-1.168.09-2.435 0 0 .772-.247 2.528.943a8.8 8.8 0 0 1 2.303-.31c.781.004 1.569.106 2.303.31 1.755-1.19 2.526-.943 2.526-.943.502 1.267.186 2.203.091 2.435.59.644.945 1.465.945 2.47 0 3.537-2.15 4.314-4.198 4.542.33.285.624.848.624 1.71 0 1.233-.011 2.227-.011 2.529 0 .247.167.535.633.445C15.368 16.812 18 13.341 18 9.25 18 4.14 13.963 0 9 0z' fill='%23666'/%3E%3C/svg%3E";
const imgUsa = "/31837ce8ddd2a679753c22bddb78a60dd3bafb4c.png";

interface CreatorProfileClientProps {
  creatorId: string;
}

export default function CreatorProfileClient({
  creatorId,
}: CreatorProfileClientProps) {
  const isVerified = false;
  const [heroBackgroundColor, setHeroBackgroundColor] = useState("#c6bcb4");
  const { backgroundColor, setBackgroundColor } = useThemeStore();
  const [activeTab, setActiveTab] = useState<"charts" | "videos" | "milestone">(
    "charts",
  );

  // Extract color from artist image on mount
  useEffect(() => {
    const extractImageColor = async () => {
      try {
        const fac = new FastAverageColor();
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = "/31837ce8ddd2a679753c22bddb78a60dd3bafb4c.png";

        img.onload = async () => {
          try {
            const color = await fac.getColor(img);

            // Convert RGB to darker, more saturated version for background
            const r = Math.floor(color.value[0] * 0.3);
            const g = Math.floor(color.value[1] * 0.3);
            const b = Math.floor(color.value[2] * 0.3);

            // Add slight tint based on dominant color
            const darkColor = `rgb(${r + 15}, ${g + 15}, ${b + 20})`;

            setHeroBackgroundColor(darkColor);
            setBackgroundColor(darkColor);
          } catch (err) {
            console.error("Error extracting color:", err);
          }
        };
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    extractImageColor();
  }, [setBackgroundColor]);

  return (
    <div className="bg-[#f6f4f2] flex flex-col items-center pb-[60px] pt-0 px-0 min-h-screen w-full">
      {/* Header - Hero Section */}
      <div
        className="flex flex-col min-h-[400px] md:min-h-[450px] lg:h-[450px] items-center justify-center mb-[-60px] overflow-hidden pb-[70px] pt-[28px] px-0 relative w-full transition-colors duration-1000"
        style={{ backgroundColor: heroBackgroundColor }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0" />

        <div className="flex items-center  max-w-[1200px] relative w-[1200px] gap-12">
          {/* Artist Image */}
          <div className="relative shrink-0">
            <div className="w-[250px] h-[250px] rounded-sm overflow-hidden ">
              <Image
                src="/610b3ca5eed1b6fdc6095c95d03192ac19d7d98d.jpg"
                alt="Kendrick Lamar"
                width={250}
                height={250}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Artist Info */}
          <div className="flex flex-col items-start relative space-y-3">
            <div className="flex  items-center relative w-full gap-2">
              <h1 className="font-extrabold text-[54px] text-white tracking-[-1.92px] py-0 leading-none">
                Kendrick Lamar
              </h1>
              <svg
                width="55"
                height="55"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.418 5.643C15.2801 5.42264 15.0769 5.25076 14.8367 5.15128C14.5966 5.0518 14.3313 5.02968 14.078 5.088L12.28 5.501C12.0957 5.54335 11.9043 5.54335 11.72 5.501L9.922 5.088C9.66866 5.02968 9.40345 5.0518 9.16327 5.15128C8.9231 5.25076 8.71991 5.42264 8.582 5.643L7.602 7.207C7.502 7.367 7.367 7.502 7.207 7.603L5.643 8.583C5.42302 8.72079 5.25139 8.92365 5.15193 9.16341C5.05248 9.40318 5.03013 9.66796 5.088 9.921L5.501 11.721C5.5432 11.9049 5.5432 12.0961 5.501 12.28L5.088 14.079C5.02991 14.3322 5.05214 14.5972 5.15161 14.8372C5.25107 15.0771 5.42283 15.2801 5.643 15.418L7.207 16.398C7.367 16.498 7.502 16.633 7.603 16.793L8.583 18.357C8.865 18.808 9.403 19.031 9.922 18.912L11.72 18.499C11.9043 18.4566 12.0957 18.4566 12.28 18.499L14.079 18.912C14.3322 18.9701 14.5972 18.9479 14.8372 18.8484C15.0771 18.7489 15.2801 18.5772 15.418 18.357L16.398 16.793C16.498 16.633 16.633 16.498 16.793 16.398L18.358 15.418C18.5782 15.2799 18.7499 15.0767 18.8492 14.8365C18.9484 14.5964 18.9704 14.3312 18.912 14.078L18.5 12.28C18.4576 12.0957 18.4576 11.9043 18.5 11.72L18.913 9.921C18.9712 9.66792 18.9491 9.40299 18.8498 9.16303C18.7505 8.92307 18.579 8.71999 18.359 8.582L16.794 7.602C16.6342 7.50182 16.4992 7.36678 16.399 7.207L15.418 5.643ZM14.915 9.77C14.9769 9.65627 14.9922 9.52298 14.9577 9.39817C14.9233 9.27337 14.8418 9.16678 14.7304 9.10084C14.619 9.0349 14.4864 9.01475 14.3604 9.04462C14.2344 9.07449 14.1249 9.15206 14.055 9.261L11.44 13.687L9.861 12.175C9.81416 12.1269 9.75811 12.0887 9.69619 12.0628C9.63428 12.0368 9.56777 12.0236 9.50063 12.0239C9.43349 12.0241 9.36709 12.038 9.30541 12.0645C9.24372 12.091 9.188 12.1296 9.14158 12.1781C9.09516 12.2266 9.05898 12.284 9.03521 12.3468C9.01143 12.4096 9.00054 12.4765 9.0032 12.5436C9.00585 12.6107 9.02198 12.6766 9.05064 12.7373C9.0793 12.798 9.11989 12.8523 9.17 12.897L11.204 14.846C11.2584 14.8981 11.3239 14.9371 11.3956 14.9603C11.4673 14.9835 11.5432 14.9902 11.6178 14.9799C11.6925 14.9696 11.7638 14.9426 11.8265 14.9009C11.8892 14.8592 11.9417 14.8038 11.98 14.739L14.915 9.77Z"
                  fill="#2078EC"
                />
              </svg>
            </div>
            {isVerified && (
              <div className="backdrop-blur-[2px] bg-[#14532d] text-white flex gap-1 items-center px-[12px] py-[4px] rounded-[99px]">
                <CheckCircle2 size={10} />
                <span className="font-medium text-[12px] ">
                  Verified Creator
                </span>
              </div>
            )}

            <p className="text-white flex items-center gap-1">
              24M followers <Dot /> 10,861 monthly visitors
              <Popover>
                <PopoverTrigger asChild>
                  <button className="cursor-help ml-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-3 bg-white border border-gray-200 shadow-lg rounded-lg">
                  <p className="text-[13px] text-gray-700">
                    The number of unique visitors to this creator&apos;s profile
                    page in the past 30 days
                  </p>
                </PopoverContent>
              </Popover>
            </p>
            {/* Genre Tags */}
            {/* <div className="flex gap-[8px] items-start relative w-full mb-6">
              <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.2)] flex items-center px-[12px] py-[4px] rounded-[99px]">
                <span className="font-medium text-[12px] text-white">
                  Hip-Hop
                </span>
              </div>
              <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.2)] flex items-center px-[12px] py-[4px] rounded-[99px]">
                <span className="font-medium text-[12px] text-white">Rap</span>
              </div>
              <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.2)] flex items-center px-[12px] py-[4px] rounded-[99px]">
                <span className="font-medium text-[12px] text-white">R&B</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className=" max-w-[1200px] mb-[-60px] relative w-[1200px]">
        {/* Management Toolbar */}
        {!isVerified && (
          <div className="absolute bg-white border border-[rgba(0,0,0,0.08)] flex items-center justify-between left-[24px] px-[25px] py-[17px] right-[24px] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)] top-0">
            <div className="relative">
              <div className="flex gap-[16px] items-center">
                {/* Profile Status */}
                <div className="flex flex-col items-start">
                  <div className="flex flex-col items-start w-full">
                    <span className="font-medium text-[14px] text-[#9b968f]">
                      Profile Status
                    </span>
                  </div>
                  <div className="flex items-center w-full">
                    <span className="font-bold text-[14px] text-[#222]">
                      Unverified
                    </span>
                    <div className="flex items-center justify-center ml-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        className="w-[14px] h-[14px]"
                        src={imgGroup}
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="bg-[rgba(0,0,0,0.08)] h-[32px] w-px" />

                {/* Claim Account Button */}
                <button className="flex gap-[8px] items-center justify-center px-[20px] py-[10px] rounded-[99px] hover:bg-gray-50 transition-colors">
                  <span className="font-bold text-[14px] text-[#222]">
                    Claim your profile to confirm ownership and unlock exclusive
                    features.
                  </span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative">
              <div className="flex items-center gap-1">
                <button className="bg-white border border-[rgba(0,0,0,0.08)] flex gap-[8px] items-center justify-center px-[21px] py-[11px] rounded-[99px] hover:bg-gray-50 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-[#1a1a1a]" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <span className="font-bold text-[14px] text-[#1a1a1a]">
                    Claim Account
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {isVerified && (
          <div className="absolute bg-white border border-[rgba(0,0,0,0.08)] flex items-center justify-between left-[24px] px-[25px] py-[17px] right-[24px] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)] top-0">
            <div className="relative">
              <div className="flex gap-[16px] items-center">
                {/* Profile Status */}
                <div className="flex flex-col items-start">
                  <div className="flex flex-col items-start w-full">
                    <span className="font-medium text-[14px] text-[#9b968f]">
                      Profile Status
                    </span>
                  </div>
                  <div className="flex items-center w-full">
                    <span className="font-bold text-[14px] text-[#222]">
                      {isVerified ? "Verified" : "Unverified"}
                    </span>
                    <div className="flex items-center justify-center ml-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        className="w-[14px] h-[14px]"
                        src={imgGroup}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative">
              <div className="flex items-center gap-1">
                {!isVerified && (
                  <button className="bg-white border border-[rgba(0,0,0,0.08)] flex gap-[8px] items-center justify-center px-[21px] py-[11px] rounded-[99px] hover:bg-gray-50 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#1a1a1a]" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <span className="font-bold text-[14px] text-[#1a1a1a]">
                      Get Verified
                    </span>
                  </button>
                )}
                <button className="bg-[#14532d] flex gap-[8px] items-center justify-center px-[20px] py-[10px] rounded-[99px] hover:bg-[#14532d] transition-colors">
                  <img alt="" className="w-4 h-4" src={imgSvg3} />
                  <span className="font-bold text-[14px] text-white">
                    Edit Profile
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Artist Details Grid */}
        <div className=" flex gap-[32px] items-start left-[24px] right-[24px] mt-[104px]">
          {/* Left: Profile Bio/Identity */}
          <div className="flex flex-col gap-[24px] items-start w-[300px]">
            <h2 className="font-bold text-[20px] text-[#222]">Artist Info</h2>

            <div className="bg-white flex flex-col gap-[16px] items-start p-[24px] rounded-[8px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] w-full">
              {/* Nationality */}
              <div className="flex flex-col items-start w-full">
                <span className="font-medium text-[12px] text-[#9b968f] mb-2">
                  NATIONALITY
                </span>
                <div className="flex gap-[8px] items-center w-full">
                  <div className="h-[10.5px] relative rounded-[2px] w-[20px] overflow-hidden">
                    <Image
                      alt="USA"
                      src={imgUsa}
                      width={20}
                      height={11}
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium text-[16px] text-[#222]">
                    United States
                  </span>
                </div>
              </div>

              <div className="bg-[#f3efed] h-px w-full" />

              {/* Social Media */}
              <div className="flex flex-col items-start w-full">
                <span className="font-medium text-[12px] text-[#9b968f] mb-2">
                  SOCIAL MEDIA
                </span>
                <div className="flex gap-[8px] items-start w-full">
                  <a
                    href="#"
                    className="bg-[#f4f4f5] flex items-center justify-center rounded-[20px] w-[40px] h-[40px] hover:bg-gray-200 transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Spotify"
                      className="w-[18px] h-[18px]"
                      src={imgGroup2}
                    />
                  </a>
                  <a
                    href="#"
                    className="bg-[#f4f4f5] flex items-center justify-center rounded-[20px] w-[40px] h-[40px] hover:bg-gray-200 transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Apple Music"
                      className="w-[18px] h-[18px]"
                      src={imgSvg4}
                    />
                  </a>
                  <a
                    href="#"
                    className="bg-[#f4f4f5] flex items-center justify-center rounded-[20px] w-[40px] h-[40px] hover:bg-gray-200 transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="YouTube"
                      className="w-[18px] h-[18px]"
                      src={imgGroup3}
                    />
                  </a>
                  <a
                    href="#"
                    className="bg-[#f4f4f5] flex items-center justify-center rounded-[20px] w-[40px] h-[40px] hover:bg-gray-200 transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Twitter"
                      className="w-[18px] h-[18px]"
                      src={imgGroup4}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stats & Performance */}
          <div className="flex flex-col gap-[32px] items-start flex-1">
            {/* Performance Section */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex gap-[12px] items-center w-full">
                <h3 className="font-bold text-[20px] text-[#222]">
                  Performance (30d)
                </h3>
                <div className="bg-[rgba(0,0,0,0.08)] flex-1 h-px" />
              </div>

              <div className="flex gap-[16px] items-start justify-center w-full">
                {/* Average Views */}
                <div className="bg-[#fafafa] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                  <span className="font-medium text-[13px] text-[#9b968f]">
                    Average Views
                  </span>
                  <span className="font-bold text-[24px] text-[#222]">
                    2.1M
                  </span>
                  <span className="font-semibold text-[12px] text-[#9b968f] mt-1">
                    -
                  </span>
                </div>

                {/* Engagement Rate */}
                <div className="bg-[#fafafa] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                  <span className="font-medium text-[13px] text-[#9b968f]">
                    Engagement Rate
                  </span>
                  <span className="font-bold text-[24px] text-[#222]">
                    9.1%
                  </span>
                  <span className="font-semibold text-[12px] text-[#7cc24a] mt-1">
                    High
                  </span>
                </div>

                {/* 30d Growth */}
                <div className="bg-[#f0fdf4] border border-[#dcfce7] flex-1 flex flex-col gap-[4px] items-start p-[17px] rounded-[6px]">
                  <span className="font-medium text-[13px] text-[#9b968f]">
                    30d Growth
                  </span>
                  <span className="font-bold text-[24px] text-[#222]">
                    25.2%
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-[#7cc24a]" />
                    <span className="font-semibold text-[12px] text-[#7cc24a]">
                      Trending
                    </span>
                  </div>
                </div>

                {/* Posts (30d) */}
                <div className="bg-[#fafafa] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                  <span className="font-medium text-[13px] text-[#9b968f]">
                    Posts (30d)
                  </span>
                  <span className="font-bold text-[24px] text-[#222]">42</span>
                  <span className="font-semibold text-[12px] text-[#9b968f] mt-1">
                    1.4 / day
                  </span>
                </div>
              </div>
            </div>

            {/* Chart Performance Section */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex gap-[12px] items-center w-full">
                <h3 className="font-bold text-[20px] text-[#222]">
                  Chart Performance
                </h3>
                <div className="bg-[rgba(0,0,0,0.08)] flex-1 h-px" />
              </div>

              <div className="flex gap-[16px] items-start justify-center w-full">
                {/* Peak Rank */}
                <div className="bg-[#1a1a1a] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                  <span className="font-medium text-[13px] text-[#a1a1aa]">
                    Peak Rank
                  </span>
                  <div className="flex gap-[8px] items-start">
                    <span className="font-bold text-[24px] text-white">#1</span>
                    <span className="font-normal text-[12px] text-[#9b968f] mt-3">
                      Global
                    </span>
                  </div>
                  <span className="font-normal text-[12px] text-[#9b968f]">
                    Highest position reached
                  </span>
                </div>

                {/* Weeks on Chart */}
                <div className="bg-[#fafafa] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                  <span className="font-medium text-[13px] text-[#9b968f]">
                    Weeks on Chart
                  </span>
                  <span className="font-bold text-[24px] text-[#222]">96</span>
                  <span className="font-semibold text-[12px] text-[#9b968f] mt-1">
                    Total weeks ranked
                  </span>
                </div>

                {/* Top 10 Appearances */}
                <div className="bg-[#fafafa] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                  <span className="font-medium text-[13px] text-[#9b968f]">
                    Top 10 Appearances
                  </span>
                  <span className="font-bold text-[24px] text-[#222]">48</span>
                  <span className="font-semibold text-[12px] text-[#9b968f] mt-1">
                    Weeks inside Top 10
                  </span>
                </div>

                {/* Peak CPI Score */}
                <div className="bg-[#fafafa] flex-1 flex flex-col gap-[4px] items-start p-[16px] rounded-[6px]">
                  <span className="font-medium text-[13px] text-[#9b968f]">
                    Peak CPI Score
                  </span>
                  <div className="flex gap-[8px] items-center">
                    <span className="font-bold text-[24px] text-[#222]">
                      92
                    </span>
                    <div className="backdrop-blur-[2px] bg-[#dcfce7] flex items-center px-[12px] py-[4px] rounded-[99px]">
                      <span className="font-medium text-[12px] text-[#166534]">
                        +31
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold text-[12px] text-[#9b968f] mt-1">
                    Composite Score
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* discovery section */}
        <div className="  w-full">
          <div className="flex flex-col gap-[16px] mt-4">
            <div className="flex flex-col gap-3">
              {/* Content Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[24px] text-[#222]">Career</h2>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-[12px] items-center">
                <button
                  onClick={() => setActiveTab("charts")}
                  className={`${activeTab === "charts" ? "bg-white text-[#222] font-semibold" : "bg-[rgba(0,0,0,0.08)] text-[#666] font-medium"} px-[16px] py-[8px] rounded-full text-[14px] hover:bg-gray-50 transition-colors`}
                >
                  Charts
                </button>
                <button
                  onClick={() => setActiveTab("videos")}
                  className={`${activeTab === "videos" ? "bg-white text-[#222] font-semibold" : "bg-[rgba(0,0,0,0.08)] text-[#666] font-medium"} px-[16px] py-[8px] rounded-full text-[14px] hover:bg-gray-50 transition-colors`}
                >
                  Videos
                </button>
                <button
                  onClick={() => setActiveTab("milestone")}
                  className={`${activeTab === "milestone" ? "bg-white text-[#222] font-semibold" : "bg-[rgba(0,0,0,0.08)] text-[#666] font-medium"} px-[16px] py-[8px] rounded-full text-[14px] hover:bg-gray-50 transition-colors`}
                >
                  Milestone
                </button>
              </div>
            </div>
            <div className="mb-6">
              {activeTab === "charts" && (
                <div className="flex gap-[16px] items-start justify-start pt-[16px]">
                  <div className=" rounded-lg   flex-1">
                    <ChartsTable />
                  </div>
                </div>
              )}
              {activeTab === "videos" && (
                <div className="flex gap-[16px] items-start justify-start pt-[16px]">
                  <div className="rounded-lg flex-1">
                    <VideosTable />
                  </div>
                </div>
              )}
              {activeTab === "milestone" && (
                <div className="flex gap-[16px] items-start justify-start pt-[16px]">
                  <div className="rounded-lg flex-1">
                    <MilestonesTable />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
