import { Metadata } from "next";
import ForgotPasswordClient from "./client";

export const metadata: Metadata = {
  title: "Forgot Password | CreatorCharts",
  description: "Reset your password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
