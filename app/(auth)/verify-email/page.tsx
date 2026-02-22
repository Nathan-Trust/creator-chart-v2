import React, { Suspense } from "react";
import VerifyEmailClient from "./client";

export const metadata = {
  title: "Verify Email - CreatorCharts",
  description: "Verify your email address to access your CreatorCharts account",
};

const VerifyEmail = () => {
  return (
    <Suspense>
      <VerifyEmailClient />
    </Suspense>
  );
};

export default VerifyEmail;
