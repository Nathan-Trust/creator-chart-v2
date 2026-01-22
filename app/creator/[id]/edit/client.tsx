"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Link as LinkIcon, Shield, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
      <div className="bg-[#453e4b] flex items-center justify-center pb-20 pt-10 w-full">
        <div className="flex flex-col gap-4 max-w-[1120px] px-5 w-full">
          {/* Breadcrumb */}
          <div className="flex gap-2 items-center">
            <Image
              src={imgGroup}
              alt=""
              width={14}
              height={14}
              className="w-3.5 h-3.5"
            />
            <p className="text-[13px] text-white/60 font-normal">
              Creators / Kendrick Lamar /
            </p>
            <p className="text-[13px] text-white/60 font-normal">
              {activeTabData.label}
            </p>
          </div>

          {/* Page Title - Changes based on active tab */}
          <h1 className="text-[32px] font-bold text-white">
            {activeTabData.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-start justify-center -mt-10 pb-15">
        <div className="flex gap-8 max-w-[1120px] px-5 w-full">
          {/* Sidebar */}
          <aside className="w-60 shrink-0">
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex gap-3 items-center px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] text-[#0f1724] font-semibold"
                        : "bg-white/90 text-[#6c757d] font-medium hover:bg-white"
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                    <span className="text-[14px]">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Form Content */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)] p-8 flex-1">
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
