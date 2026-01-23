"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Link as LinkIcon, Shield, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FastAverageColor } from "fast-average-color";
import { useThemeStore } from "@/lib/stores/theme-store";
import GeneralInfoTab from "@/components/creator/edit/general-info-tab";
import SocialLinksTab from "@/components/creator/edit/social-links-tab";
import VerificationTab from "@/components/creator/edit/verification-tab";
import AccountSettingsTab from "@/components/creator/edit/account-settings-tab";
import { imgGroup } from "@/public/svg-taiqh";

const profileSchema = z.object({
  // General Info
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  location: z.string().optional().or(z.literal("")),
  bio: z
    .string()
    .max(160, "Bio must be under 160 characters")
    .optional()
    .or(z.literal("")),
  // Social Links
  instagram: z.string().optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
  youtube: z.string().optional().or(z.literal("")),
  tiktok: z.string().optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const defaultValues: ProfileFormValues = {
  displayName: "Kendrick Lamar",
  username: "kendricklamar",
  location: "Los Angeles, CA",
  bio: "American rapper, songwriter, and record producer. Often cited as one of the most influential rappers of his generation.",
  instagram: "instagram.com/kendricklamar",
  twitter: "twitter.com/kendricklamar",
  youtube: "",
  tiktok: "",
  website: "oklama.com",
};

interface CreatorProfileEditClientProps {
  creatorId: string;
}

type TabId = "general" | "social" | "verification" | "settings";

const tabs = [
  {
    id: "general" as TabId,
    label: "General Info",
    title: "General Information",
    icon: User,
  },
  {
    id: "social" as TabId,
    label: "Social Links",
    title: "Social Links",
    icon: LinkIcon,
  },
  {
    id: "verification" as TabId,
    label: "Verification",
    title: "Verification",
    icon: Shield,
  },
  {
    id: "settings" as TabId,
    label: "Account Settings",
    title: "Account Settings",
    icon: Settings,
  },
];

export default function CreatorProfileEditClient({
  creatorId,
}: CreatorProfileEditClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("#453e4b");
  const { setBackgroundColor } = useThemeStore();

  // Extract color from artist image on mount
  useEffect(() => {
    const extractImageColor = async () => {
      try {
        const fac = new FastAverageColor();
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        // Using the same referenced image as the main profile page for consistency
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

            setHeaderBackgroundColor(darkColor);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    console.log("Form submitted:", data);
  }

  function handleDiscard() {
    router.push(`/creator/${creatorId}`);
  }

  const activeTabData = tabs.find((tab) => tab.id === activeTab)!;

  return (
    <div className="bg-[#f6f9fc] min-h-screen w-full">
      {/* Page Header */}
      <div
        className="flex items-center justify-center pb-12 md:pb-16 lg:pb-20 pt-6 md:pt-8 lg:pt-10 w-full transition-colors duration-1000"
        style={{ backgroundColor: headerBackgroundColor }}
      >
        <div className="flex flex-col gap-2 md:gap-3 lg:gap-4 max-w-[1120px] px-4 md:px-5 w-full">
          {/* Breadcrumb */}
          <div className="flex gap-2 items-center">
            <Image
              src={imgGroup}
              alt=""
              width={14}
              height={14}
              className="w-3 h-3 md:w-3.5 md:h-3.5"
            />
            <p className="text-[11px] md:text-[13px] text-white/60 font-normal">
              Creators / Kendrick Lamar /
            </p>
            <p className="text-[11px] md:text-[13px] text-white/60 font-normal">
              {activeTabData.label}
            </p>
          </div>

          {/* Page Title - Changes based on active tab */}
          <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-white">
            {activeTabData.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-start justify-center -mt-6 md:-mt-8 lg:-mt-10 pb-10 md:pb-12 lg:pb-15">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 max-w-[1120px] px-4 md:px-5 w-full">
          {/* Mobile Tab Navigation - Horizontal Scroll */}
          <div className="md:hidden flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex gap-2 items-center px-4 py-2.5 rounded-full transition-all whitespace-nowrap flex-shrink-0 backdrop-blur ${
                    isActive
                      ? "bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] text-[#0f1724] font-semibold"
                      : "bg-white/90 text-[#6c757d] font-medium"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[13px]">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-48 lg:w-60 shrink-0">
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex gap-2 lg:gap-3 items-center px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] text-[#0f1724] font-semibold"
                        : "bg-white/90 text-[#6c757d] font-medium hover:bg-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
                    <span className="text-[13px] lg:text-[14px]">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Form Content */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)] p-5 md:p-6 lg:p-8 flex-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              {activeTab === "general" && (
                <GeneralInfoTab
                  register={register}
                  errors={errors}
                  onSave={handleSubmit(onSubmit)}
                  onDiscard={handleDiscard}
                />
              )}

              {activeTab === "social" && (
                <SocialLinksTab
                  register={register}
                  errors={errors}
                  onSave={handleSubmit(onSubmit)}
                  onDiscard={handleDiscard}
                />
              )}

              {activeTab === "verification" && (
                <VerificationTab onDiscard={handleDiscard} />
              )}

              {activeTab === "settings" && (
                <AccountSettingsTab onDiscard={handleDiscard} />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
