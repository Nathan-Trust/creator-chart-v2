import { NextRequest, NextResponse } from "next/server";
import { AuthService, mapAuthToUserData } from "@/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const {
      accountType,
      fullName,
      displayName,
      email,
      password,
      confirmPassword,
      country,
      category,
      termsAndConditionsAccepted,
      instagram,
      tiktok,
      youtube,
      x,
      facebook,
    } = data;

    if (!accountType || !email || !password || !confirmPassword || !fullName) {
      return NextResponse.json(
        { success: false, message: "Missing required signup fields" },
        { status: 400 },
      );
    }

    const payload = {
      fullName,
      email,
      password,
      confirmPassword,
      displayName,
      termsAndConditionsAccepted: Boolean(termsAndConditionsAccepted),
    };

    const result =
      accountType === "creator"
        ? await AuthService.signupCreator({
            ...payload,
            country,
            category,
            socialHandles: {
              instagram: instagram || undefined,
              tiktok: tiktok || undefined,
              youtube: youtube || undefined,
              x: x || undefined,
              facebook: facebook || undefined,
            },
          })
        : await AuthService.signupUser(payload);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    const userData = mapAuthToUserData(result.data?.user, result.data?.creator);

    return NextResponse.json({
      success: true,
      user: userData,
      token: result.data?.accessToken || null,
      verificationCode: result.data?.verificationCode,
      message: result.message || "Account created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create account" },
      { status: 500 },
    );
  }
}
