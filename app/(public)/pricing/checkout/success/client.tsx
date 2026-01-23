"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get transaction details from URL params (in real app, would come from server/API)
  const transactionId = searchParams.get("txn") || "TXN-884201";
  const amount = searchParams.get("amount") || "5,375.00";

  // Format current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleReturnToDashboard = () => {
    router.push("/");
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log("Downloading receipt for transaction:", transactionId);
  };

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="flex items-center justify-center px-5 py-[70px]">
        <div className="relative bg-white border border-black/8 rounded-3xl shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] w-full max-w-[480px] px-10 pt-10 pb-10">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#d1e7dd] rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-[#198754]" strokeWidth={3} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[24px] font-extrabold text-[#0f172a] text-center mb-3">
            Payment Successful!
          </h1>

          {/* Description */}
          <p className="text-[16px] text-[#6c757d] text-center leading-[24px] mb-8">
            You are now a verified creator. A confirmation email has been sent
            to your registered email address.
          </p>

          {/* Transaction Details Card */}
          <div className="bg-white border border-black/8 rounded-xl p-[21px] mb-8">
            <div className="flex flex-col gap-3">
              {/* Transaction ID */}
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#6c757d]">
                  Transaction ID
                </span>
                <span className="text-[14px] font-semibold text-[#0f172a]">
                  {transactionId}
                </span>
              </div>

              {/* Date */}
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#6c757d]">Date</span>
                <span className="text-[14px] font-semibold text-[#0f172a]">
                  {currentDate}
                </span>
              </div>

              {/* Payment Method */}
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#6c757d]">
                  Payment Method
                </span>
                <span className="text-[14px] font-semibold text-[#0f172a]">
                  Mastercard •••• 4242
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-black/8 pt-3 mt-1">
                <div className="flex justify-between items-center">
                  <span className="text-[16px] font-bold text-[#6c757d]">
                    Amount Paid
                  </span>
                  <span className="text-[16px] font-semibold text-black">
                    ₦{amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleReturnToDashboard}
              className="w-full h-12 bg-black hover:bg-black/90 text-white text-[15px] font-semibold rounded-lg"
            >
              Return to Dashboard
            </Button>

            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="w-full h-12 border-black/8 text-[#0f172a] text-[15px] font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
