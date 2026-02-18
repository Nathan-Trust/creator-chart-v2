import { NextRequest, NextResponse } from "next/server";
import { AuthService, mapAuthToUserData } from "@/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 },
      );
    }

    const result = await AuthService.login({ email, password });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    const userData = mapAuthToUserData(result.data?.user, result.data?.creator);

    return NextResponse.json({
      success: true,
      user: userData,
      token: result.data?.accessToken || null,
      message: result.message || "Sign in successful",
    });
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to sign in" },
      { status: 500 },
    );
  }
}
