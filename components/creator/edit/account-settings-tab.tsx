"use client";

import { useState } from "react";
import { Smartphone, Trash2, Eye, EyeOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore as useUserStore } from "@/store/user-store";
import { successToast } from "@/util/toast";

interface AccountSettingsTabProps {
  onDiscard: () => void;
}

export default function AccountSettingsTab({
  onDiscard,
}: AccountSettingsTabProps) {
  const { userData } = useUserStore();

  // Email State
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState(userData?.email || "kendrick@pglang.com");

  // Password State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 2FA State
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleUpdateEmail = () => {
    if (isEditingEmail) {
      // Mock API call
      successToast({
        title: "Email Updated",
        message: "Your email has been successfully updated.",
      });
      setIsEditingEmail(false);
    } else {
      setIsEditingEmail(true);
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword) {
      // Basic validation
      return;
    }
    // Mock API call
    successToast({
      title: "Password Changed",
      message: "Your password has been successfully updated.",
    });
    setIsChangingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  const toggle2FA = () => {
    const newState = !is2FAEnabled;
    setIs2FAEnabled(newState);
    successToast({
      title: newState ? "2FA Enabled" : "2FA Disabled",
      message: newState
        ? "Two-factor authentication is now active."
        : "Two-factor authentication has been disabled.",
    });
  };

  const handleDeleteAccount = () => {
    // Mock API call
    successToast({
      title: "Account Deleted",
      message: "Your account has been scheduled for deletion.",
    });
  };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditingEmail}
            className={`flex-1 bg-[#f8f9fa] border-[#dce0e3] text-[#6c757d] text-[14px] px-3 py-2.5 h-[38px] rounded-md ${
              isEditingEmail ? "bg-white text-black border-black/20" : ""
            }`}
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleUpdateEmail}
            className="border-[#dce0e3] text-[#2b2b2b] text-[14px] font-bold px-6 py-2.5 h-[38px] rounded-[20px]"
          >
            {isEditingEmail ? "Save" : "Update"}
          </Button>
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-[#333]">Password</label>

        {!isChangingPassword ? (
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
              onClick={() => setIsChangingPassword(true)}
              className="border-[#dce0e3] text-[#2b2b2b] text-[14px] font-bold px-6 py-2.5 h-[38px] rounded-[20px]"
            >
              Change
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-white"
              />
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex gap-2 justify-end mt-1">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsChangingPassword(false)}
                className="h-9 px-4 rounded-[20px]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleChangePassword}
                disabled={!currentPassword || !newPassword}
                className="bg-black text-white h-9 px-4 rounded-[20px]"
              >
                Save Password
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="flex flex-col gap-3 py-2">
        <label className="text-[13px] font-medium text-[#333]">
          Two-Factor Authentication
        </label>
        <div className="flex items-center justify-between border border-black/8 rounded-lg px-3 py-3">
          <div className="flex gap-3 items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                is2FAEnabled ? "bg-[#e0f2fe]" : "bg-gray-100"
              }`}
            >
              <Smartphone
                className={`w-4 h-4 ${
                  is2FAEnabled ? "text-[#0369a1]" : "text-gray-400"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#2b2b2b]">
                Authenticator App
              </span>
              <span className="text-[12px] text-[#6c757d]">
                {is2FAEnabled ? "Secure with 2FA" : "Not enabled"}
              </span>
            </div>
          </div>
          <Button
            type="button"
            onClick={toggle2FA}
            variant={is2FAEnabled ? "outline" : "default"}
            className={`${
              is2FAEnabled
                ? "bg-white text-black border-gray-300"
                : "bg-black text-white"
            } text-[13px] font-bold px-4 py-1.5 h-auto rounded-[20px] hover:opacity-90`}
          >
            {is2FAEnabled ? "Disable" : "Enable"}
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="border-[#ffecec] bg-white text-[#dc2626] text-[14px] font-bold px-6 py-2.5 h-auto rounded-[20px] hover:bg-red-50"
            >
              <Trash2 className="w-3.5 h-3.5 mr-2" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
