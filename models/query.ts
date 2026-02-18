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
  Get_Creator_History = "get_creator_history",
  Get_Weekly_Stats = "get_weekly_stats",

  // Analytics
  Get_Analytics_Overview = "get_analytics_overview",

  // Legacy keys (keeping for backward compatibility)
  Get_User = "Get_User",
  Get_User_List = "Get_User_List",
  Get_Role_List = "Get_Role_List",
  Get_Permission_List = "Get_Permission_List",
  Get_Administrator_List = "Get_Administrator_List",
  Get_Company_List = "Get_Company_List",
  Get_Department_List = "Get_Department_List",
  Get_Position_List = "Get_Position_List",
  Get_Grade_Level_List = "Get_Grade_Level_List",
  Get_Employee_List = "Get_Employee_List",
  Get_Employee_List_Without_Pagination = "Get_Employee_List_Without_Pagination",
  Get_Employee_Type_List = "Get_Employee_Type_List",
  Get_Employee_By_Id = "Get_Employee_By_Id",
  Get_Job_List = "Get_Job_List",
  Get_Job_By_Id = "Get_Job_By_Id",
  Get_Job_Type_List = "Get_Job_Type_List",
  Get_Job_Role_List = "Get_Job_Role_List",
  Get_Job_Category_List = "Get_Job_Category_List",
  Get_Job_Status_List = "Get_Job_Status_List",
  Get_Job_Location_List = "Get_Job_Location_List",
  Get_Job_Site_List = "Get_Job_Site_List",
  Get_Country_List = "Get_Country_List",
  Get_State_List = "Get_State_List",
  Get_City_List = "Get_City_List",
  Get_User_Hotels = "Get_User_Hotels",
  Get_Offer_Letter_Template = "Get_Offer_Letter_Template", // ✅ New
  Get_Shift_List = "Get_Shift_List", // ✅ Added for shifts
  Get_Clock_In_List = "Get_Clock_In_List", // ✅ New: Added for clock-in list
  Get_Clock_In_Report = "Get_Clock_In_Report", // ✅ New for report
  Get_Payroll_Records = "Get_Payroll_Records", // ✅ Added for fetching payroll records
  Process_Payroll = "Process_Payroll", // ✅ Added for processing payroll
  Get_Payroll_Details = "Get_Payroll_Details", // ✅ NEW: Added for fetching single payroll details
  Get_Payroll_History_List = "Get_Payroll_History_List", // ✅ NEW: Added for payroll history list
  Get_Adhoc_Payments_List = "Get_Adhoc_Payments_List", // Add this new key
  Get_Vendor_Payments_List = "Get_Vendor_Payments_List", // Add this new key
  Get_Vendor_Payment = "Get_Vendor_Payment", // Add this new key
  Get_Deduction_Agencies = "getDeductionAgencies",
  Get_Base_Pay_List = "getBasePayList",
  Get_Benefits_List = "getBenefitsList",
  Get_Authority_List = "getAuthorityList",
  Get_Authority_Profile = "getAuthorityProfile",
  Get_Assigned_Authorities = "getAssignedAuthorities", // ✅ NEW
  Get_Wallet_Balance = "Get_Wallet_Balance",
  Get_Offers = "Get_Offers",
  Get_Payroll_Transaction_Details = "Get_Payroll_Transaction_Details", // ✅ NEW: Added for individual transaction details**
  Get_Payroll_Transaction_Report_Details = "Get_Payroll_Transaction_Report_Details", // ✅ NEW: Added for individual transaction details**
  Get_Payment_Stubs = "Get_Payment_Stubs", // ✅ NEW: Added for payment stubs
  Get_Trainings_List = "get_trainings_list",
  Get_Licenses_List = "get_licenses_list",
  Get_Certifications_List = "get_certifications_list",
  Get_Employee_Certifications_List = "get_employee_certifications_list",
  Get_Employee_License_List = "get_employee_license_list",
  Get_Employee_Trainings_List = "get_employee_trainings_list",
  Get_Deduction_Agency = "get_deduction_agency",
  Get_Agency_Wallet_Transactions = "get_agency_wallet_transactions",
  Get_All_Banks = "get_all_banks",
  Get_Clock_Time_Reports = "get_clock_time_reports",
  Get_Employee_Report = "get_employee_reports",
  Get_Courses_Report = "get_courses_reports",
  Get_Job_Location_Report = "get_job_location_reports",
  Get_Job_Role_Report = "get_job_role_reports",
  Get_Clock_Pay_Report = "get_clock_pay_reports",
  Get_Employee_Report_Details_By_Id = "get_employee_report_details_by_id",
  Get_Training_Details_By_Id = "get_training_details_by_id",
  Get_Host_Institution = "get_host_institution_list",
  Get_Supervisor_List = "Get_Supervisor_List", // ✅ Added for paginated supervisor list
  Get_Supervisor_List_Without_Pagination = "Get_Supervisor_List_Without_Pagination", // ✅ Added for non-paginated supervisor list
  Get_Supervisor_Hierarchy = "Get_Supervisor_Hierarchy", // ✅ Added for paginated supervisor hierarchy
  Get_Supervisor_Hierarchy_Without_Pagination = "Get_Supervisor_Hierarchy_Without_Pagination", // ✅ Added for non-paginated supervisor hierarchy
  Get_Places_List = "GET_PLACES_LIST",
  Get_Payroll_Commission_Settings = "Get_Payroll_Commission_Settings",
  Get_Vacation_Days_List = "Get_Vacation_Days_List", // ✅ Added for vacation days list
  Get_Vacation_Day_By_Id = "Get_Vacation_Day_By_Id", // ✅ Added for individual vacation day details
  Get_Vacation_Types = "GET_VACATION_TYPES",
  // Performance related
  Get_Performance_Categories = "GET_PERFORMANCE_CATEGORIES",
  Get_Employee_Performance_List = "GET_EMPLOYEE_PERFORMANCE_LIST",
  Get_Performance_Matrix_List = "GET_PERFORMANCE_MATRIX_LIST",
  Get_Employee_Cycle_Matrix_List = "GET_EMPLOYEE_CYCLE_MATRIX_LIST",
  Get_Employee_Recognition_List = "GET_EMPLOYEE_RECOGNITION_LIST",
  Get_Employee_Invite_Performance_List = "GET_EMPLOYEE_INVITE_PERFORMANCE_LIST",
  Get_Employee_Performance_Matrix_List = "GET_EMPLOYEE_PERFORMANCE_MATRIX_LIST",
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

  // Legacy error codes (keeping for backward compatibility)
  User = "User",
  Users = "Users",
  UserHotels = "UserHotels",
  Roles = "Roles",
  Permissions = "Permissions",
  Administrators = "Administrators",
  Companies = "Companies",
  Departments = "Departments",
  Positions = "Positions",
  Employees = "Employees",
  EmployeeTypes = "EmployeeTypes",
  EmployeeList = "EmployeeList",
  EmployeeListWithoutPagination = "EmployeeListWithoutPagination",
  Jobs = "Jobs",
  JobTypes = "JobTypes",
  GradeLevels = "GradeLevels",
  JobRoles = "JobRoles",
  JobCategories = "JobCategories",
  JobStatuses = "JobStatuses",
  JobLocations = "JobLocations",
  JobSites = "JobSites",
  Countries = "Countries",
  States = "States",
  Cities = "Cities",
  OfferLetterTemplate = "OfferLetterTemplate", // ✅ New
  PayrollTransactionReportDetails = "PayrollTransactionReportDetails", // ✅ New
  Shifts = "Shifts", // ✅ Added for shifts
  ClockInList = "ClockInList", // ✅ New: Added for clock-in list errors
  ClockInReport = "ClockInReport", // ✅ New for report errors
  PayrollRecords = "PayrollRecords", // ✅ Added for payroll records errors
  ProcessPayroll = "ProcessPayroll", // ✅ Added for process payroll errors
  PayrollDetails = "PayrollDetails", // ✅ NEW: Added for payroll details errors
  PayrollHistory = "PayrollHistory", // ✅ NEW: Added for payroll history errors
  AdhocPayments = "AdhocPayments", // Add this new error code
  VendorPayments = "VendorPayments", // Add this new error code
  DeductionAgencies = "DEDUCTION_AGENCIES_ERROR",
  BasePayList = "BASE_PAY_LIST_ERROR",
  BenefitsList = "BENEFITS_LIST_ERROR",
  AuthorityList = "AUTHORITY_LIST_ERROR",
  AuthorityProfile = "AUTHORITY_PROFILE_LIST_ERROR",
  AssignedAuthorities = "ASSIGNED_AUTHORITIES_ERROR", // ✅ NEW
  WalletBalance = "WalletBalance",
  PayrollTransactionDetails = "PayrollTransactionDetails",
  Offers = "Offers",
  PaymentStubs = "PaymentStubs", // ✅ NEW: Added for payment stubs
  Trainings = "TRAININGS_ERROR",
  Licenses = "LICENSES_ERROR",
  Certifications = "CERTIFICATIONS_ERROR",
  EmployeeCertifications = "EMPLOYEE_CERTIFICATIONS_ERROR",
  EmployeeLicenses = "EMPLOYEE_LICENSES_ERROR",
  EmployeeTrainings = "EMPLOYEE_TRAININGS_ERROR",
  DeductionAgency = "DEDUCTION_AGENCY_BY_ID_ERROR",
  AgencyWalletTransactions = "AGENCY_WALLET_TRANSACTIONS",
  PaystackBanks = "PAYSTACK_BANKS",
  ClockTimeReports = "CLOCK_TIME_REPORTS",
  CourseReports = "COURSE_REPORTS",
  EmployeeReports = "EMPLOYEE_REPORTS",
  JobRoleReports = "JOB_ROLE_REPORTS",
  JobLocationReports = "JOB_LOCATION_REPORTS",
  ClockPayReports = "CLOCK_PAY_REPORTS",
  EmployeeReportDetailsById = "EMPLOYEE_REPORT_DETAILS_BY_ID_ERROR",
  TrainingDetailsById = "TRAINING_DETAILS_BY_ID_ERROR",
  HostInstitution = "HOST_INSTITUTION_ERROR",
  SupervisorList = "SupervisorList", // ✅ Added for supervisor list errors
  SupervisorListWithoutPagination = "SupervisorListWithoutPagination", // ✅ Added for non-paginated supervisor list errors
  SupervisorHierarchy = "SupervisorHierarchy", // ✅ Added for supervisor hierarchy errors
  SupervisorHierarchyWithoutPagination = "SupervisorHierarchyWithoutPagination", // ✅ Added for non-paginated supervisor hierarchy errors
  Get_Places_List = "GET_PLACES_LIST",
  PayrollCommissionSettings = "PayrollCommissionSettings",
  VacationDays = "VacationDays", // ✅ Added for vacation days list errors
  VacationDayDetails = "VacationDayDetails", // ✅ Added for individual vacation day details errors
  Vacation_Types = "VACATION_TYPES",
  PerformanceCategories = "PERFORMANCE_CATEGORIES",
  EmployeePerformance = "EMPLOYEE_PERFORMANCE",
  PerformanceMatrix = "PERFORMANCE_MATRIX",
  EmployeeCycleMatrix = "EMPLOYEE_CYCLE_MATRIX",
  EmployeeRecognition = "EMPLOYEE_RECOGNITION",
  EmployeeInvitePerformance = "EMPLOYEE_INVITE_PERFORMANCE",
  EmployeePerformanceMatrix = "EMPLOYEE_PERFORMANCE_MATRIX",
}
