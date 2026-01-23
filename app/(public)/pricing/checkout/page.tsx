import { Suspense } from "react";
import CheckoutClient from "./client";

export const metadata = {
  title: "Checkout - Complete Your Purchase",
  description:
    "Complete your purchase to get verified and access premium features.",
};

export default function CheckoutPage() {
    return (
      <Suspense>
        <CheckoutClient />
      </Suspense>
    );
}
