import type { CreatorSignupFormData, UserSignupFormData } from "@/schema/auth";
import {
  AuthService,
  type ApiResponse,
  type AuthSessionPayload,
  type LoginDto,
  type ResetPasswordDto,
} from "@/services/auth.service";

class AuthServiceFacade {
  async signupUser(
    data: UserSignupFormData,
  ): Promise<ApiResponse<AuthSessionPayload>> {
    return AuthService.signupUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      displayName: data.displayName || undefined,
      termsAndConditionsAccepted: data.termsAndConditionsAccepted,
    });
  }

  async signupCreator(
    data: CreatorSignupFormData,
  ): Promise<ApiResponse<AuthSessionPayload>> {
    return AuthService.signupCreator({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      displayName: data.displayName || undefined,
      country: data.country,
      category: data.category,
      termsAndConditionsAccepted: data.termsAndConditionsAccepted,
      socialHandles: {
        instagram: data.instagram || undefined,
        tiktok: data.tiktok || undefined,
        youtube: data.youtube || undefined,
        x: data.x || undefined,
        facebook: data.facebook || undefined,
      },
    });
  }

  async login(dto: LoginDto): Promise<ApiResponse<AuthSessionPayload>> {
    return AuthService.login(dto);
  }

  async requestEmailVerification(email: string) {
    return AuthService.requestEmailVerification({ email });
  }

  async verifyEmailOtp(email: string, code: number | string) {
    return AuthService.verifyEmailOtp({ email, code });
  }

  async forgotPassword(email: string) {
    return AuthService.forgotPassword({ email });
  }

  async resetPassword(dto: ResetPasswordDto) {
    return AuthService.resetPassword(dto);
  }

  async verifyCreator(creatorId: string, code: string) {
    return AuthService.verifyCreator({ creatorId, code });
  }
}

export const authService = new AuthServiceFacade();
export default authService;
