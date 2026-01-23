import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    // Generate a random 6-character verification code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    // TODO: Store code in database with email and expiration time
    // TODO: Send code via email

    return NextResponse.json({
      success: true,
      code,
      message: "Verification code generated successfully",
    });
  } catch (error) {
    console.error("Generate code error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate verification code" },
      { status: 500 },
    );
  }
}
