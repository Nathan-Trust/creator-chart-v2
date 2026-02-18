import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: "Email and code are required" },
        { status: 400 },
      );
    }

    const result = await AuthService.verifyEmailOtp({ email, code });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Verify handle error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to verify email" },
      { status: 500 },
    );
  }
}
