import type { SignupFormData } from "@/schema/auth";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  displayName: string;
  verified?: boolean;
  verifiedPlatform?: string;
  verifiedPlatforms?: string[];
}

class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
  }

  /**
   * Generate verification code
   */
  async generateVerificationCode(
    email: string,
  ): Promise<ApiResponse<{ code: string }>> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/generate-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      return { success: true, data: { code: result.code } };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to generate code",
      };
    }
  }

  /**
   * Verify social handle
   */
  async verifySocialHandle(
    code: string,
    platform: string,
    handle: string,
  ): Promise<ApiResponse<{ verified: boolean }>> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/verify-handle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, platform, handle }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      return { success: true, data: { verified: result.verified } };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Verification failed",
      };
    }
  }

  /**
   * Complete signup
   */
  async signup(
    data: SignupFormData & {
      verified?: boolean;
      verifiedPlatform?: string;
      verifiedPlatforms?: string[];
    },
  ): Promise<ApiResponse<{ user: User }>> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      return { success: true, data: result.user };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Signup failed",
      };
    }
  }
}

export const authService = new AuthService();
export default authService;
