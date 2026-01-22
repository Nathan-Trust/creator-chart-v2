"use client";

import { Smartphone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AccountSettingsTabProps {
  onDiscard: () => void;
}

export default function AccountSettingsTab({
  onDiscard,
}: AccountSettingsTabProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="border-b border-black/8 pb-4">
        <h2 className="text-lg font-semibold text-[#2b2b2b] mb-1">
          Login &amp; Security
        </h2>
        <p className="text-[13px] text-[#6c757d]">
          Manage your credentials and account access.
        </p>
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-[#333]">
          Email Address
        </label>
        <div className="flex gap-3">
          <Input
            type="email"
            defaultValue="kendrick@pglang.com"
            disabled
            className="flex-1 bg-[#f8f9fa] border-[#dce0e3] text-[#6c757d] text-[14px] px-3 py-2.5 h-[38px] rounded-md"
          />
          <Button
            type="button"
            variant="outline"
            className="border-[#dce0e3] text-[#2b2b2b] text-[14px] font-bold px-6 py-2.5 h-[38px] rounded-[20px]"
          >
            Update
          </Button>
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-[#333]">Password</label>
        <div className="flex gap-3">
          <Input
            type="password"
            defaultValue="zkjdhfskjdfhskj"
            disabled
            className="flex-1 bg-[#f8f9fa] border-[#dce0e3] text-[#6c757d] text-[14px] px-3 py-2.5 h-[38px] rounded-md"
          />
          <Button
            type="button"
            variant="outline"
            className="border-[#dce0e3] text-[#2b2b2b] text-[14px] font-bold px-6 py-2.5 h-[38px] rounded-[20px]"
          >
            Change
          </Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="flex flex-col gap-3 py-2">
        <label className="text-[13px] font-medium text-[#333]">
          Two-Factor Authentication
        </label>
        <div className="flex items-center justify-between border border-black/8 rounded-lg px-3 py-3">
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-full bg-[#e0f2fe] flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-[#0369a1]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#2b2b2b]">
                Authenticator App
              </span>
              <span className="text-[12px] text-[#6c757d]">
                Secure your account with 2FA
              </span>
            </div>
          </div>
          <Button
            type="button"
            className="bg-black text-white text-[13px] font-bold px-4 py-1.5 h-auto rounded-[20px] hover:bg-black/90"
          >
            Enable
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-6 mt-4">
        <h3 className="text-[16px] font-semibold text-[#991b1b] mb-2">
          Danger Zone
        </h3>
        <p className="text-[13px] text-[#7f1d1d] mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <Button
          type="button"
          variant="outline"
          className="border-[#ffecec] bg-white text-[#dc2626] text-[14px] font-bold px-6 py-2.5 h-auto rounded-[20px] hover:bg-red-50"
        >
          <Trash2 className="w-3.5 h-3.5 mr-2" />
          Delete Account
        </Button>
      </div>
    </div>
  );
}
