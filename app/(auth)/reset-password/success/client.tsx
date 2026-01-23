"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function ResetPasswordSuccessClient() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push("/sign-in");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full max-w-md">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">Password reset successful!</h1>
        <p className="text-gray-600 mb-8">
          Your password has been successfully reset. You can now sign in with
          your new password.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/sign-in")}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign in now
          </button>

          <p className="text-sm text-gray-500">
            Redirecting to sign in page in 5 seconds...
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          Security tips:
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Use a unique password for each account</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Consider using a password manager</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Enable two-factor authentication when available</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
