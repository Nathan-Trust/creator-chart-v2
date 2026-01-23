import { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordClient from "./client";

export const metadata: Metadata = {
  title: "Reset Password | CreatorCharts",
  description: "Create a new password",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
