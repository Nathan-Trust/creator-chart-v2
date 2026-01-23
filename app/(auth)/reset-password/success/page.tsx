import { Metadata } from "next";
import ResetPasswordSuccessClient from "./client";

export const metadata: Metadata = {
  title: "Password Reset Successful | CreatorCharts",
  description: "Your password has been reset",
};

export default function ResetPasswordSuccessPage() {
  return <ResetPasswordSuccessClient />;
}
