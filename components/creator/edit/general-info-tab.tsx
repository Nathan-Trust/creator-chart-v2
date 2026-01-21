/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { User, AtSign, MapPin, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldSet, FieldLabel, FieldError } from "@/components/ui/field";

interface GeneralInfoTabProps {
  register: any;
  errors: any;
  onSave: () => void;
  onDiscard: () => void;
}

export default function GeneralInfoTab({
  register,
  errors,
  onSave,
  onDiscard,
}: GeneralInfoTabProps) {
  const [bioLength, setBioLength] = useState(0);

  return (
    <div className="flex flex-col gap-8">
      {/* Profile Details Header */}
      <div className="border-b border-black/8 pb-[17px]">
        <h2 className="text-[18px] font-semibold text-[#0f1724] mb-1">
          Profile Details
        </h2>
        <p className="text-[13px] text-[#6c757d]">
          Update your public profile information and visual assets.
        </p>
      </div>

      {/* Media Uploads */}
      <div className="flex gap-8 border-b border-black/8 pb-[33px]">
        {/* Profile Picture */}
        <div className="flex flex-col gap-3">
          <label className="text-[14px] font-medium text-[#0f1724]">
            Profile Picture
          </label>
          <div className="w-[100px] h-[100px] rounded-full border border-black/8 bg-[#f8f9fa] overflow-hidden">
            <Image
              src="/15cebe025eb2bcc8db9f07ce36329df1c79ee3ad.png"
              alt="Profile"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            className="border-black/8 text-[#0f1724] text-[13px] px-[13px] py-[7px] h-auto rounded-md"
          >
            Change Photo
          </Button>
        </div>

        
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-[13px] pb-2">
      

        {/* Username */}
        <FieldSet className="gap-2">
          <FieldLabel className="text-[14px] font-medium text-[#0f1724] ">
            Username
          </FieldLabel>
          <div className="flex border border-black/8 rounded-lg overflow-hidden bg-white h-[46px]">
            <div className="w-[44px] flex items-center justify-center bg-[#f8f9fa] border-r border-black/8">
              <AtSign className="w-5 h-5 text-[#0f1724]" />
            </div>
            <Input
              {...register("username")}
              className="border-0 text-[14px] px-4 h-full rounded-none"
              placeholder="kendricklamar"
            />
          </div>
          {errors.username && (
            <FieldError>{errors.username.message}</FieldError>
          )}
        </FieldSet>

        {/* Location */}
        <FieldSet className="gap-2">
          <FieldLabel className="text-[14px] font-medium text-[#0f1724] ">
            Location
          </FieldLabel>
          <div className="flex border border-black/8 rounded-lg overflow-hidden bg-white h-[46px]">
            <div className="w-[44px] flex items-center justify-center bg-[#f8f9fa] border-r border-black/8">
              <MapPin className="w-5 h-5 text-[#0f1724]" />
            </div>
            <Input
              {...register("location")}
              className="border-0 text-[14px] px-4 h-full rounded-none"
              placeholder="Los Angeles, CA"
            />
          </div>
          {errors.location && (
            <FieldError>{errors.location.message}</FieldError>
          )}
        </FieldSet>

        {/* Bio */}
        <FieldSet className="gap-3">
          <div className="flex items-center justify-between ">
            <FieldLabel className="text-[14px] font-medium text-[#0f1724]">
              Bio
            </FieldLabel>
            <span className="text-[12px] text-[#6c757d]">{bioLength}/160</span>
          </div>
          <div className="flex border border-black/8 rounded-lg overflow-hidden bg-white min-h-[100px]">
            <div className="w-[44px] flex items-start justify-center bg-[#f8f9fa] border-r border-black/8 pt-3">
              <AlignLeft className="w-5 h-5 text-[#0f1724]" />
            </div>
            <Textarea
              {...register("bio")}
              onChange={(e) => setBioLength(e.target.value.length)}
              maxLength={160}
              className="border-0 text-[14px] px-4 py-3 min-h-[100px] rounded-none resize-none"
              placeholder="American rapper, songwriter, and record producer. Often cited as one of the most influential rappers of his generation."
            />
          </div>
          {errors.bio && <FieldError>{errors.bio.message}</FieldError>}
        </FieldSet>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end border-t border-black/8 pt-[25px]">
        <Button
          type="button"
          variant="outline"
          onClick={onDiscard}
          className="border-black/8 text-[#0f1724] text-[14px] px-[21px] py-[11px] h-auto rounded-[20px]"
        >
          Discard Changes
        </Button>
        <Button
          type="button"
          onClick={onSave}
          className="bg-black text-white text-[14px] font-bold px-6 py-[11px] h-auto rounded-[20px] hover:bg-black/90"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
