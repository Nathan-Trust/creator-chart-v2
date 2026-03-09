export enum QueryKeys {
  // Auth & Creator
  Get_Creator_Profile = "get_creator_profile",
  Get_Creator_By_Id = "get_creator_by_id",
  Get_Creators_List = "get_creators_list",
  Get_Trending_Creators = "get_trending_creators",
  Get_Weekly_Metrics = "get_weekly_metrics",

  // Videos
  Get_Viral_Videos = "get_viral_videos",
  Get_Top_Videos = "get_top_videos",

  // Trending Creators
  Get_Trending_Creator_List = "get_trending_creator_list",

  // Rankings
  Get_Rankings = "get_rankings",
  Get_Country_Rankings = "get_country_rankings",
  Get_Creator_History = "get_creator_history",

  // Highlights (unified)
  Get_Highlights = "get_highlights",
  Get_Rankings_Highlights = "get_rankings_highlights",
  Get_Top_Videos_Highlights = "get_top_videos_highlights",
  Get_Viral_Videos_Highlights = "get_viral_videos_highlights",
  Get_Trending_Creators_Highlights = "get_trending_creators_highlights",
}

export enum QueryErrCodes {
  // Auth & Creator
  Auth = "AUTH_ERROR",
  Creator_Profile = "CREATOR_PROFILE_ERROR",
  Creators = "CREATORS_ERROR",
  Creator_Details = "CREATOR_DETAILS_ERROR",
  Weekly_Metrics = "WEEKLY_METRICS_ERROR",

  // Videos
  Videos = "VIDEOS_ERROR",

  // Rankings
  Rankings = "RANKINGS_ERROR",
  Trending_Creators = "TRENDING_CREATORS_ERROR",

  // Analytics
  Analytics = "ANALYTICS_ERROR",

  // General
  Network = "NETWORK_ERROR",
  Unknown = "UNKNOWN_ERROR",
}
