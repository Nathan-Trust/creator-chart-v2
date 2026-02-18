import React, { Suspense } from "react";
import SignupClient from "./client";

export const metadata = {
  title: "Sign Up - CreatorCharts",
  description:
    "Create your CreatorCharts account and join thousands of creators",
};

const Signup = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupClient />
    </Suspense>
  );
};

export default Signup;
