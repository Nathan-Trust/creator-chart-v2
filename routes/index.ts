export class CreatorChartsRoutes {
  // Auth routes
  public static readonly SIGN_IN = "/sign-in";
  public static readonly SIGN_UP = "/sign-up";
  public static readonly ONBOARDING = "/onboarding";
  public static readonly FORGOT_PASSWORD = "/forgot-password";
  public static readonly RESET_PASSWORD = "/reset-password";

  // Main routes
  public static readonly HOME = "/";
  public static readonly BASE = "/creator/charts";

  public static readonly TOP_CREATORS = "/creators/top";
  public static readonly TRENDING_CREATORS = "/creators/trending";

  public static readonly TOP_VIDEOS = "/videos/top";
  public static readonly VIRAL_VIDEOS = "/videos/viral";

  public static readonly PRICING = "/pricing";

  // Creator profile
  public static readonly CREATOR_PROFILE = (id: string) => `/creator/${id}`;
  public static readonly CREATOR_EDIT = (id: string) => `/creator/${id}/edit`;
}
