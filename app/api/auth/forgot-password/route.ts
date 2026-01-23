import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // TODO: Implement actual logic:
    // 1. Check if user exists in database
    // 2. Generate a secure reset token (crypto.randomBytes)
    // 3. Store token in database with expiration (e.g., 1 hour)
    // 4. Send email with reset link using email service (SendGrid, Resend, etc.)

    // Mock implementation: Generate a token and log the reset link
    const resetToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

    console.log("=".repeat(60));
    console.log("📧 Password Reset Email (Mock)");
    console.log("=".repeat(60));
    console.log(`To: ${email}`);
    console.log(`Reset Link: ${resetLink}`);
    console.log(`Token: ${resetToken}`);
    console.log(`Expires: ${new Date(Date.now() + 3600000).toISOString()}`);
    console.log("=".repeat(60));

    return NextResponse.json({
      success: true,
      message:
        "If an account exists with this email, you will receive a password reset link.",
      // Note: In production, always return success regardless of whether email exists (security best practice)
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
