import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // TODO: Implement actual authentication logic
    // 1. Find user by email in database
    // 2. Compare hashed password
    // 3. Create session/JWT token
    // 4. Return user data and token

    // Mock authentication - always succeeds for demo
    const user = {
      id: Math.random().toString(36).substring(7),
      email,
      name: "Demo User",
      displayName: "demouser",
      verified: true,
    };

    return NextResponse.json({
      success: true,
      user,
      token: "mock_jwt_token",
      message: "Sign in successful",
    });
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to sign in" },
      { status: 500 }
    );
  }
}
