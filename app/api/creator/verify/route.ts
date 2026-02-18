import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const { creatorId, code } = await request.json();

    if (!creatorId || !code) {
      return NextResponse.json(
        { success: false, message: "Creator id and code are required" },
        { status: 400 },
      );
    }

    const result = await AuthService.verifyCreator({ creatorId, code });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Verify creator error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to verify creator" },
      { status: 500 },
    );
  }
}
