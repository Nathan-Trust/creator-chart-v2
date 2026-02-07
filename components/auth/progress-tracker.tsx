import React from "react";
import { Check } from "lucide-react";

interface ProgressTrackerProps {
  currentStep: number;
}

const STEPS = [
  { label: "Sign Up", description: "Create your account" },
  { label: "Verify", description: "Verify your identity" },
  { label: "Complete", description: "You're all set!" },
];

export default function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  return (
    <div className="w-full py-8 px-6 bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between relative">
          {STEPS.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <React.Fragment key={stepNumber}>
                {/* Step Circle */}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-[#14532d] shadow-lg"
                        : isCurrent
                          ? "bg-[#14532d] shadow-lg ring-4 ring-[#14532d]/20"
                          : "bg-white border-2 border-gray-300"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <span
                        className={`text-lg font-bold ${
                          isCurrent ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {stepNumber}
                      </span>
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="mt-3 text-center">
                    <p
                      className={`text-sm font-semibold mb-1 ${
                        isCurrent || isCompleted
                          ? "text-[#14532d]"
                          : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-500 max-w-[120px] hidden md:block">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < STEPS.length - 1 && (
                  <div className="flex-1 h-1 mx-2 relative -translate-y-[22px] z-0">
                    <div className="w-full h-full bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          stepNumber < currentStep
                            ? "bg-[#14532d] w-full"
                            : "bg-gray-300 w-0"
                        }`}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
