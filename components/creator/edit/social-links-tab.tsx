"use client";

import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldSet, FieldLabel, FieldError } from "@/components/ui/field";
import { FaXTwitter } from "react-icons/fa6";

// TikTok icon (not in lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.025 0H12.85C13.075 1.675 14.275 3.25 16.425 3.525V6.175C15.075 6.175 13.85 5.725 12.875 5.025V10.5C12.875 15.725 7.075 17.35 4.55 13.85C2.925 11.575 3.725 7.425 8.125 7.25V10.025C7.8 10.075 7.45 10.15 7.125 10.275C6.125 10.625 5.5 11.35 5.625 12.475C5.85 14.475 9.275 15.05 9.025 11.275V0H10.025Z" />
    </svg>
  );
}

interface SocialLinksTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  onSave: () => void;
  onDiscard: () => void;
}

export default function SocialLinksTab({
  register,
  errors,
  onSave,
  onDiscard,
}: SocialLinksTabProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="border-b border-black/8 pb-4">
        <h2 className="text-lg font-semibold text-[#0f1724] mb-1">
          Connected Accounts
        </h2>
        <p className="text-[13px] text-[#6c757d]">
          Link your social media profiles to display them on your public creator
          page.
        </p>
      </div>

      {/* Social Links Fields */}
      <div className="flex flex-col gap-5 pb-2">
        {/* Instagram */}
        <FieldSet>
          <FieldLabel className="text-[14px] font-medium text-[#0f1724] mb-2">
            Instagram
          </FieldLabel>
          <div className="flex border border-black/8 rounded-lg overflow-hidden bg-white h-[46px]">
            <div className="w-11 flex items-center justify-center bg-[#f8f9fa] border-r border-black/8">
              <Instagram className="w-5 h-5 text-[#0f1724]" />
            </div>
            <Input
              {...register("instagram")}
              placeholder="instagram.com/username"
              className="border-0 rounded-none h-full px-4 text-[14px] focus-visible:ring-0"
            />
          </div>
          {errors.instagram && (
            <FieldError>{errors.instagram.message}</FieldError>
          )}
        </FieldSet>

        {/* X (Twitter) */}
        <FieldSet>
          <FieldLabel className="text-[14px] font-medium text-[#0f1724] mb-2">
            X (Twitter)
          </FieldLabel>
          <div className="flex border border-black/8 rounded-lg overflow-hidden bg-white h-[46px]">
            <div className="w-11 flex items-center justify-center bg-[#f8f9fa] border-r border-black/8">
              <FaXTwitter className="w-5 h-5 text-[#0f1724]" />
            </div>
            <Input
              {...register("twitter")}
              placeholder="twitter.com/username"
              className="border-0 rounded-none h-full px-4 text-[14px] focus-visible:ring-0"
            />
          </div>
          {errors.twitter && <FieldError>{errors.twitter.message}</FieldError>}
        </FieldSet>

        {/* YouTube */}
        <FieldSet>
          <FieldLabel className="text-[14px] font-medium text-[#0f1724] mb-2">
            YouTube
          </FieldLabel>
          <div className="flex border border-black/8 rounded-lg overflow-hidden bg-white h-[46px]">
            <div className="w-11 flex items-center justify-center bg-[#f8f9fa] border-r border-black/8">
              <Youtube className="w-5 h-5 text-[#0f1724]" />
            </div>
            <Input
              {...register("youtube")}
              placeholder="Add YouTube "
              className="border-0 rounded-none h-full px-4 text-[14px] focus-visible:ring-0 placeholder:text-[#6c757d]"
            />
          </div>
          {errors.youtube && <FieldError>{errors.youtube.message}</FieldError>}
        </FieldSet>

        {/* TikTok */}
        <FieldSet>
          <FieldLabel className="text-[14px] font-medium text-[#0f1724] mb-2">
            TikTok
          </FieldLabel>
          <div className="flex border border-black/8 rounded-lg overflow-hidden bg-white h-[46px]">
            <div className="w-11 flex items-center justify-center bg-[#f8f9fa] border-r border-black/8">
              <TikTokIcon className="w-5 h-5 text-[#0f1724]" />
            </div>
            <Input
              {...register("tiktok")}
              placeholder="Add TikTok"
              className="border-0 rounded-none h-full px-4 text-[14px] focus-visible:ring-0 placeholder:text-[#6c757d]"
            />
          </div>
          {errors.tiktok && <FieldError>{errors.tiktok.message}</FieldError>}
        </FieldSet>

        {/* Facebook */}
        <FieldSet>
          <FieldLabel className="text-[14px] font-medium text-[#0f1724] mb-2">
            Facebook
          </FieldLabel>
          <div className="flex border border-black/8 rounded-lg overflow-hidden bg-white h-[46px]">
            <div className="w-11 flex items-center justify-center bg-[#f8f9fa] border-r border-black/8">
              <Facebook className="w-5 h-5 text-[#0f1724]" />
            </div>
            <Input
              {...register("facebook")}
              placeholder="facebook.com/username"
              className="border-0 rounded-none h-full px-4 text-[14px] focus-visible:ring-0"
            />
          </div>
          {errors.facebook && (
            <FieldError>{errors.facebook.message}</FieldError>
          )}
        </FieldSet>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end border-t border-black/8 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onDiscard}
          className="border-black/8 text-[#0f1724] text-[14px] px-5 py-2.5 h-auto rounded-[20px]"
        >
          Discard Changes
        </Button>
        <Button
          type="submit"
          onClick={onSave}
          className="bg-black text-white text-[14px] font-bold px-6 py-2.5 h-auto rounded-[20px] hover:bg-black/90"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
