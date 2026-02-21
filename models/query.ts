export enum QueryKeys {
  // Auth & Creator
  Get_Creator_Profile = "get_creator_profile",
  Get_Creator_By_Id = "get_creator_by_id",
  Get_Creators_List = "get_creators_list",
  Get_Trending_Creators = "get_trending_creators",
  Get_Top_Creators = "get_top_creators",
  Get_Weekly_Metrics = "get_weekly_metrics",

  // Videos
  Get_Videos_List = "get_videos_list",
  Get_Viral_Videos = "get_viral_videos",
  Get_Top_Videos = "get_top_videos",

  // Rankings
  Get_Rankings = "get_rankings",
  Get_Country_Rankings = "get_country_rankings",
  Get_Creator_History = "get_creator_history",
  Get_Weekly_Stats = "get_weekly_stats",
  Get_Active_Countries = "get_active_countries",

  // Analytics
  Get_Analytics_Overview = "get_analytics_overview",
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
  Weekly_Stats = "WEEKLY_STATS_ERROR",

  // Analytics
  Analytics = "ANALYTICS_ERROR",

  // General
  Network = "NETWORK_ERROR",
  Unknown = "UNKNOWN_ERROR",
}
