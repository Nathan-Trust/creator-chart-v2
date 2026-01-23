import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const {
      email,
      password,
      name,
      displayName,
      verified,
      verifiedPlatform,
      verifiedPlatforms,
    } = data;

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: "Email, password, and name are required" },
        { status: 400 },
      );
    }

    // TODO: Implement actual signup logic
    // 1. Hash password
    // 2. Check if email already exists
    // 3. Create user in database
    // 4. Send welcome email
    // 5. Create session/JWT token

    // Mock user creation
    const user = {
      id: Math.random().toString(36).substring(7),
      email,
      name,
      displayName: displayName || name,
      verified: verified || false,
      verifiedPlatform: verifiedPlatform || null,
      verifiedPlatforms: verifiedPlatforms || [],
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      user,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create account" },
      { status: 500 },
    );
  }
}
