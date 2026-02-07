"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CreditCard,
  Building2,
  Smartphone,
  Check,
  Lock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PaymentMethod = "card" | "transfer" | "ussd";

export default function CheckoutClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const billingPeriod = searchParams.get("billing") || "monthly";

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [saveCard, setSaveCard] = useState(true);
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Pricing calculations
  const basePrice = 5000;
  const price =
    billingPeriod === "annually" ? Math.round(basePrice * 0.8) : basePrice;
  const subtotal = price;
  const tax = Math.round(subtotal * 0.075); // 7.5% VAT
  const processingFee = 0;
  const total = subtotal + tax + processingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Processing payment:", { paymentMethod, formData, total });
    // Payment processing logic would go here
    // On success, redirect to success page
    const txnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    router.push(
      `/pricing/checkout/success?txn=${txnId}&amount=${total.toLocaleString()}.00`,
    );
  };

  return (
    <div className="bg-white min-h-screen w-full pb-[120px]">
      <div className="max-w-[1080px] mx-auto px-4 md:px-5 pt-6 md:pt-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 items-start">
          {/* Left: Payment Form */}
          <div className="w-full lg:flex-1 lg:max-w-[600px]">
            {/* Step 1: Payment Method */}
            <div className="flex gap-3 items-center mb-6">
              <div className="w-7 h-7 bg-black rounded-[14px] flex items-center justify-center">
                <span className="text-[14px] font-bold text-white">1</span>
              </div>
              <h2 className="text-[20px] font-bold text-[#0f172a]">
                Select Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {/* Card Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex flex-col items-center justify-center gap-2 md:gap-3 p-3 md:p-[18px] rounded-xl border-2 transition-all relative ${
                  paymentMethod === "card"
                    ? "border-black bg-[#f5f5f5]"
                    : "border-black/8 bg-white hover:border-black/20"
                }`}
              >
                <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-[#0f172a]" />
                <span className="text-[12px] md:text-[14px] font-semibold text-[#0f172a]">
                  Card
                </span>
                {paymentMethod === "card" && (
                  <div className="absolute top-2.5 right-2.5 w-[18px] h-[18px] bg-black rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>

              {/* Transfer Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod("transfer")}
                className={`flex flex-col items-center justify-center gap-2 md:gap-3 p-3 md:p-[17px] rounded-xl border transition-all relative ${
                  paymentMethod === "transfer"
                    ? "border-2 border-black bg-[#f5f5f5]"
                    : "border border-black/8 bg-white hover:border-black/20"
                }`}
              >
                <Building2 className="w-5 h-5 md:w-6 md:h-6 text-[#0f172a]" />
                <span className="text-[12px] md:text-[14px] font-semibold text-[#0f172a]">
                  Transfer
                </span>
                {paymentMethod === "transfer" && (
                  <div className="absolute top-2.5 right-2.5 w-[18px] h-[18px] bg-black rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>

              {/* USSD Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod("ussd")}
                className={`flex flex-col items-center justify-center gap-2 md:gap-3 p-3 md:p-[17px] rounded-xl border transition-all relative ${
                  paymentMethod === "ussd"
                    ? "border-2 border-black bg-[#f5f5f5]"
                    : "border border-black/8 bg-white hover:border-black/20"
                }`}
              >
                <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-[#0f172a]" />
                <span className="text-[12px] md:text-[14px] font-semibold text-[#0f172a]">
                  USSD
                </span>
                {paymentMethod === "ussd" && (
                  <div className="absolute top-2.5 right-2.5 w-[18px] h-[18px] bg-black rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            </div>

            {/* Step 2: Payment Details */}
            <div className="flex gap-3 items-center mb-6 pt-4">
              <div className="w-7 h-7 bg-black rounded-[14px] flex items-center justify-center">
                <span className="text-[14px] font-bold text-white">2</span>
              </div>
              <h2 className="text-[20px] font-bold text-[#0f172a]">
                Payment Details
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {paymentMethod === "card" && (
                <>
                  {/* Cardholder Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-[#6c757d]">
                      Cardholder Name
                    </label>
                    <Input
                      type="text"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="h-12 border-black/8 rounded-lg"
                    />
                  </div>

                  {/* Card Number */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-[#6c757d]">
                      Card Number
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="h-12 border-black/8 rounded-lg pr-12"
                      />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6c757d]" />
                    </div>
                  </div>

                  {/* Expiry & CVV */}
                  <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-[14px] font-medium text-[#6c757d]">
                        Expiry Date
                      </label>
                      <Input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="h-12 border-black/8 rounded-lg"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-[14px] font-medium text-[#6c757d]">
                        CVC / CVV
                      </label>
                      <Input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="h-12 border-black/8 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Save Card Checkbox */}
                  <div className="flex gap-2 items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setSaveCard(!saveCard)}
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        saveCard ? "bg-black border-black" : "border-black/8"
                      }`}
                    >
                      {saveCard && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <span className="text-[14px] font-medium text-[#6c757d]">
                      Save card securely for future payments
                    </span>
                  </div>
                </>
              )}

              {paymentMethod === "transfer" && (
                <div className="p-6 bg-[#f8f9fa] rounded-xl border border-black/8">
                  <p className="text-[14px] text-[#6c757d] mb-4">
                    You will be redirected to complete the bank transfer after
                    clicking the pay button.
                  </p>
                  <div className="flex items-center gap-2 text-[13px] text-[#6c757d]">
                    <Shield className="w-4 h-4" />
                    <span>Secure bank-level encryption</span>
                  </div>
                </div>
              )}

              {paymentMethod === "ussd" && (
                <div className="p-6 bg-[#f8f9fa] rounded-xl border border-black/8">
                  <p className="text-[14px] text-[#6c757d] mb-4">
                    You will receive a USSD code to dial on your phone after
                    clicking the pay button.
                  </p>
                  <div className="flex items-center gap-2 text-[13px] text-[#6c757d]">
                    <Smartphone className="w-4 h-4" />
                    <span>Works with all Nigerian banks</span>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-[400px] lg:shrink-0">
            <div className="bg-white border border-black/8 rounded-xl md:rounded-2xl p-5 md:p-8">
              {/* Plan Info */}
              <div className="border-b border-black/8 pb-4 md:pb-5 mb-5 md:mb-6">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[16px] md:text-[18px] font-bold text-[#0f172a]">
                    Verified Plan
                  </span>
                  <span className="text-[16px] md:text-[18px] font-bold text-[#0f172a]">
                    ₦{price.toLocaleString()}
                  </span>
                </div>
                <div className="inline-block bg-[#f1f3f5] px-2 py-1 rounded">
                  <span className="text-[14px] text-[#6c757d]">
                    Billed{" "}
                    {billingPeriod === "monthly" ? "Monthly" : "Annually"}
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-[10px] mb-6">
                <div className="flex justify-between">
                  <span className="text-[15px] text-[#6c757d]">Subtotal</span>
                  <span className="text-[15px] text-[#6c757d]">
                    ₦{subtotal.toLocaleString()}.00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[15px] text-[#6c757d]">
                    Tax (VAT 7.5%)
                  </span>
                  <span className="text-[15px] text-[#6c757d]">
                    ₦{tax.toLocaleString()}.00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[15px] text-[#6c757d]">
                    Processing Fee
                  </span>
                  <span className="text-[15px] text-[#6c757d]">
                    ₦{processingFee.toLocaleString()}.00
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-black/8 pt-4 md:pt-5 mb-5 md:mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] md:text-[16px] font-semibold text-[#0f172a]">
                    Total Due
                  </span>
                  <span className="text-[20px] md:text-[24px] font-extrabold text-black">
                    ₦{total.toLocaleString()}.00
                  </span>
                </div>
              </div>

              {/* Pay Button */}
              <Button
                onClick={handleSubmit}
                className="w-full h-[48px] md:h-[52px] bg-black hover:bg-black/90 text-white text-[14px] md:text-[16px] font-bold rounded-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Pay ₦{total.toLocaleString()}.00
              </Button>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-1.5 mt-5">
                <Shield className="w-3.5 h-3.5 text-[#6c757d]" />
                <span className="text-[13px] text-[#6c757d]">
                  Payments are secure and encrypted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
