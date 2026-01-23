
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/api/v1/admin/auth/register": {
        "post": {
          "operationId": "AdminController_register",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateAdminDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Admin registered successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RegisterAdminResponseDto"
                  }
                }
              }
            },
            "409": {
              "description": "Email already exists"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Register a new admin (SUPER_ADMIN only)",
          "tags": [
            "Admin - Authentication & Management"
          ]
        }
      },
      "/api/v1/admin/auth/login": {
        "post": {
          "operationId": "AdminController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginAdminDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login successful",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/LoginAdminResponseDto"
                  }
                }
              }
            },
            "401": {
              "description": "Invalid credentials"
            }
          },
          "summary": "Admin login",
          "tags": [
            "Admin - Authentication & Management"
          ]
        }
      },
      "/api/v1/admin/auth/logout": {
        "post": {
          "operationId": "AdminController_logout",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Logout successful",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/LogoutAdminResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Admin logout",
          "tags": [
            "Admin - Authentication & Management"
          ]
        }
      },
      "/api/v1/admin/auth/profile": {
        "get": {
          "operationId": "AdminController_getProfile",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Profile retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetAdminProfileResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Get current admin profile",
          "tags": [
            "Admin - Authentication & Management"
          ]
        },
        "patch": {
          "operationId": "AdminController_updateProfile",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateAdminDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Profile updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UpdateAdminProfileResponseDto"
                  }
                }
              }
            },
            "409": {
              "description": "Email already in use"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Update admin profile",
          "tags": [
            "Admin - Authentication & Management"
          ]
        }
      },
      "/api/v1/admin/auth/change-password": {
        "post": {
          "operationId": "AdminController_changePassword",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ChangePasswordDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Password changed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ChangePasswordResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Current password incorrect"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Change admin password",
          "tags": [
            "Admin - Authentication & Management"
          ]
        }
      },
      "/api/v1/admin/admins": {
        "get": {
          "operationId": "AdminController_listAdmins",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "schema": {
                "example": 20,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Admins retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ListAdminsResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "List all admins (SUPER_ADMIN only)",
          "tags": [
            "Admin - Authentication & Management"
          ]
        }
      },
      "/api/v1/admin/admins/{id}": {
        "delete": {
          "operationId": "AdminController_deleteAdmin",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Admin deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DeleteAdminResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Admin not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Delete admin (SUPER_ADMIN only)",
          "tags": [
            "Admin - Authentication & Management"
          ]
        }
      },
      "/api/v1/admin/admins/{id}/toggle-active": {
        "patch": {
          "operationId": "AdminController_toggleActiveStatus",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Admin status updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ToggleAdminStatusResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Admin not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Toggle admin active status (SUPER_ADMIN only)",
          "tags": [
            "Admin - Authentication & Management"
          ]
        }
      },
      "/api/v1/claims/initiate": {
        "post": {
          "operationId": "ClaimsController_initiate",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InitiateClaimDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Claim request initiated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InitiateClaimResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Creator not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Initiate a profile claim request",
          "tags": [
            "Claims"
          ]
        }
      },
      "/api/v1/claims/verify": {
        "post": {
          "operationId": "ClaimsController_verify",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/VerifyClaimDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Profile claimed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VerifyClaimResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Verification code not found in bio or expired"
            },
            "404": {
              "description": "Claim request not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Verify a claim request",
          "tags": [
            "Claims"
          ]
        }
      },
      "/api/v1/creators/register": {
        "post": {
          "description": "Creates a new creator account with the provided information. Sends a welcome email upon successful registration.",
          "operationId": "CreatorsController_register",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCreatorDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Creator registered successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RegisterCreatorResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request - Creator with this email already exists or validation failed"
            }
          },
          "summary": "Register a new creator",
          "tags": [
            "Creators"
          ]
        }
      },
      "/api/v1/creators/login": {
        "post": {
          "description": "Authenticates a creator using email and password. Sets JWT token in HTTP-only cookie.",
          "operationId": "CreatorsController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginCreatorDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login successful",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/LoginCreatorResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request - Invalid email or password"
            }
          },
          "summary": "Login creator",
          "tags": [
            "Creators"
          ]
        }
      },
      "/api/v1/creators/me": {
        "get": {
          "description": "Returns the authenticated creator profile. Cached in Redis for 2 minutes.",
          "operationId": "CreatorsController_getMe",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Profile retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreatorProfileResponseDto"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            }
          },
          "security": [
            {
              "cookie": []
            }
          ],
          "summary": "Get current creator profile",
          "tags": [
            "Creators"
          ]
        }
      },
      "/api/v1/creators/request-verification": {
        "post": {
          "description": "Generates a verification code that must be added to the creator bio on the selected platform. Code expires in 24 hours.",
          "operationId": "CreatorsController_requestVerification",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RequestVerificationDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Verification code generated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RequestVerificationResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request - Profile already claimed or creator not found"
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            }
          },
          "security": [
            {
              "cookie": []
            }
          ],
          "summary": "Request profile verification",
          "tags": [
            "Creators"
          ]
        }
      },
      "/api/v1/creators/verify-profile": {
        "post": {
          "description": "Verifies that the verification code is present in the creator bio on the selected platform. Marks profile as verified and claimed upon success.",
          "operationId": "CreatorsController_verifyProfile",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/VerifyProfileDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Profile verified and claimed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VerifyProfileResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request - Code not found in bio, expired, or profile already claimed"
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            }
          },
          "security": [
            {
              "cookie": []
            }
          ],
          "summary": "Verify profile ownership",
          "tags": [
            "Creators"
          ]
        }
      },
      "/api/v1/rankings": {
        "get": {
          "operationId": "RankingsController_getRankings",
          "parameters": [
            {
              "name": "country",
              "required": false,
              "in": "query",
              "schema": {
                "enum": [
                  "Nigeria",
                  "Ghana",
                  "South_Africa",
                  "Kenya"
                ],
                "type": "string"
              }
            },
            {
              "name": "category",
              "required": false,
              "in": "query",
              "schema": {
                "enum": [
                  "COMEDY",
                  "LIFESTYLE",
                  "TECH",
                  "MUSIC",
                  "GAMING",
                  "BUSINESS",
                  "EDUCATION"
                ],
                "type": "string"
              }
            },
            {
              "name": "weekNumber",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "year",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Rankings retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetRankingsResponseDto"
                  }
                }
              }
            }
          },
          "summary": "Get published rankings with filters",
          "tags": [
            "Ranking"
          ]
        }
      },
      "/api/v1/rankings/creator/{creatorId}/history": {
        "get": {
          "operationId": "RankingsController_getCreatorHistory",
          "parameters": [
            {
              "name": "creatorId",
              "required": true,
              "in": "path",
              "description": "Creator ID",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "startDate",
              "required": false,
              "in": "query",
              "description": "Start date for filtering (ISO 8601 format, e.g., 2026-01-01)",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "endDate",
              "required": false,
              "in": "query",
              "description": "End date for filtering (ISO 8601 format, e.g., 2026-01-20)",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Creator rank history retrieved",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetCreatorHistoryResponseDto"
                  }
                }
              }
            }
          },
          "summary": "Get creator rank history",
          "tags": [
            "Ranking"
          ]
        }
      },
      "/api/v1/rankings/admin/trigger": {
        "post": {
          "operationId": "RankingsController_triggerRankingCalculation",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Ranking calculation job queued",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TriggerRankingResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Manually trigger ranking calculation (Admin only)",
          "tags": [
            "Ranking"
          ]
        }
      },
      "/api/v1/rankings/admin/{rankingId}/publish": {
        "post": {
          "operationId": "RankingsController_publishRankings",
          "parameters": [
            {
              "name": "rankingId",
              "required": true,
              "in": "path",
              "description": "Ranking ID to publish",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Rankings published successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PublishRankingsResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Publish pending rankings (Admin only)",
          "tags": [
            "Ranking"
          ]
        }
      },
      "/api/v1/rankings/admin/all": {
        "get": {
          "operationId": "RankingsController_getAllRankings",
          "parameters": [
            {
              "name": "country",
              "required": false,
              "in": "query",
              "schema": {
                "enum": [
                  "Nigeria",
                  "Ghana",
                  "South_Africa",
                  "Kenya"
                ],
                "type": "string"
              }
            },
            {
              "name": "category",
              "required": false,
              "in": "query",
              "schema": {
                "enum": [
                  "COMEDY",
                  "LIFESTYLE",
                  "TECH",
                  "MUSIC",
                  "GAMING",
                  "BUSINESS",
                  "EDUCATION"
                ],
                "type": "string"
              }
            },
            {
              "name": "weekNumber",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "year",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "status",
              "required": false,
              "in": "query",
              "schema": {
                "enum": [
                  "PENDING",
                  "PUBLISHED",
                  "ARCHIVED"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "All rankings retrieved",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetRankingsResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Get all rankings including PENDING (Admin only)",
          "tags": [
            "Ranking"
          ]
        }
      },
      "/api/v1/countries/active": {
        "get": {
          "operationId": "CountriesController_getActiveCountries",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Active countries retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetActiveCountriesResponseDto"
                  }
                }
              }
            }
          },
          "summary": "Get all active countries (Public)",
          "tags": [
            "Country Management"
          ]
        }
      },
      "/api/v1/admin/countries": {
        "get": {
          "operationId": "AdminCountriesController_listCountries",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Countries retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ListCountriesResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "List all countries with configurations",
          "tags": [
            "Admin - Country Management"
          ]
        }
      },
      "/api/v1/admin/countries/enable": {
        "post": {
          "operationId": "AdminCountriesController_enableCountry",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EnableCountryDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Country enabled successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/EnableCountryResponseDto"
                  }
                }
              }
            },
            "409": {
              "description": "Country already enabled"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Enable a country (SUPER_ADMIN only)",
          "tags": [
            "Admin - Country Management"
          ]
        }
      },
      "/api/v1/admin/countries/disable": {
        "post": {
          "operationId": "AdminCountriesController_disableCountry",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DisableCountryDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Country disabled successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DisableCountryResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Country configuration not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Disable a country (SUPER_ADMIN only)",
          "tags": [
            "Admin - Country Management"
          ]
        }
      },
      "/api/v1/admin/countries/active": {
        "patch": {
          "operationId": "AdminCountriesController_setActiveStatus",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SetActiveCountryDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Country status updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SetActiveStatusResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Country configuration not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Set country active status for ranking cycle",
          "tags": [
            "Admin - Country Management"
          ]
        }
      },
      "/api/v1/admin/countries/rollout": {
        "patch": {
          "operationId": "AdminCountriesController_setRolloutDate",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SetRolloutDateDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Rollout date set successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SetRolloutDateResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Set country rollout date (SUPER_ADMIN only)",
          "tags": [
            "Admin - Country Management"
          ]
        }
      },
      "/api/v1/categories/{country}": {
        "get": {
          "operationId": "CategoriesController_getActiveCategories",
          "parameters": [
            {
              "name": "country",
              "required": true,
              "in": "path",
              "schema": {
                "enum": [
                  "Nigeria",
                  "Ghana",
                  "South_Africa",
                  "Kenya"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Active categories retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetActiveCategoriesResponseDto"
                  }
                }
              }
            }
          },
          "summary": "Get active categories for a country (Public)",
          "tags": [
            "Category Management"
          ]
        }
      },
      "/api/v1/admin/categories": {
        "get": {
          "operationId": "AdminCategoriesController_listCategories",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Categories retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ListCategoriesResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "List all categories per country with configurations",
          "tags": [
            "Admin - Category Management"
          ]
        }
      },
      "/api/v1/admin/categories/enable": {
        "post": {
          "operationId": "AdminCategoriesController_enableCategory",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EnableCategoryDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Category enabled successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/EnableCategoryResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Country must be enabled first"
            },
            "409": {
              "description": "Category already enabled"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Enable a category for a country",
          "tags": [
            "Admin - Category Management"
          ]
        }
      },
      "/api/v1/admin/categories/disable": {
        "post": {
          "operationId": "AdminCategoriesController_disableCategory",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DisableCategoryDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Category disabled successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DisableCategoryResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Category configuration not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Disable a category for a country",
          "tags": [
            "Admin - Category Management"
          ]
        }
      },
      "/api/v1/admin/curators": {
        "post": {
          "operationId": "AdminCuratorsController_createCurator",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCuratorDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Curator created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreateCuratorResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Admin must have CURATOR role"
            },
            "404": {
              "description": "Admin not found"
            },
            "409": {
              "description": "Admin is already a curator"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Create a curator (SUPER_ADMIN only)",
          "tags": [
            "Admin - Curator Management"
          ]
        },
        "get": {
          "operationId": "AdminCuratorsController_listCurators",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Curators retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ListCuratorsResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "List all curators",
          "tags": [
            "Admin - Curator Management"
          ]
        }
      },
      "/api/v1/admin/curators/{id}/assign-countries": {
        "patch": {
          "operationId": "AdminCuratorsController_assignCountries",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AssignCountriesDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Countries assigned successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AssignCountriesResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Curator not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Assign countries to a curator (SUPER_ADMIN only)",
          "tags": [
            "Admin - Curator Management"
          ]
        }
      },
      "/api/v1/admin/curators/{id}": {
        "delete": {
          "operationId": "AdminCuratorsController_deleteCurator",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Curator deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DeleteCuratorResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Curator not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Delete a curator (SUPER_ADMIN only)",
          "tags": [
            "Admin - Curator Management"
          ]
        }
      },
      "/api/v1/admin/curators/submissions": {
        "get": {
          "operationId": "AdminCuratorsController_getAllSubmissions",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number (starts from 1)",
              "schema": {
                "minimum": 1,
                "default": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 20,
                "example": 20,
                "type": "number"
              }
            },
            {
              "name": "status",
              "required": false,
              "in": "query",
              "description": "Filter by submission status",
              "schema": {
                "example": "PENDING",
                "type": "string",
                "enum": [
                  "PENDING",
                  "APPROVED",
                  "REJECTED"
                ]
              }
            },
            {
              "name": "curator_id",
              "required": false,
              "in": "query",
              "description": "Filter by curator ID",
              "schema": {
                "example": "550e8400-e29b-41d4-a716-446655440000",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Submissions retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetSubmissionsResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "View all pending submissions (Admin)",
          "tags": [
            "Admin - Curator Management"
          ]
        }
      },
      "/api/v1/admin/curators/submissions/{id}/approve": {
        "post": {
          "operationId": "AdminCuratorsController_approveSubmission",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApproveSubmissionDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Submission approved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ApproveSubmissionResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Only pending submissions can be approved"
            },
            "404": {
              "description": "Submission not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Approve a submission",
          "tags": [
            "Admin - Curator Management"
          ]
        }
      },
      "/api/v1/admin/curators/submissions/{id}/reject": {
        "post": {
          "operationId": "AdminCuratorsController_rejectSubmission",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RejectSubmissionDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Submission rejected successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RejectSubmissionResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Only pending submissions can be rejected"
            },
            "404": {
              "description": "Submission not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Reject a submission",
          "tags": [
            "Admin - Curator Management"
          ]
        }
      },
      "/api/v1/curators/creators": {
        "post": {
          "operationId": "CuratorsController_submitCreator",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SubmitCreatorDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Creator submission created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SubmitCreatorResponseDto"
                  }
                }
              }
            },
            "403": {
              "description": "Not assigned to this country"
            },
            "409": {
              "description": "Creator with this email already exists"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Submit a new creator (Curator only)",
          "tags": [
            "Curators - Submission System"
          ]
        }
      },
      "/api/v1/curators/creators/{id}": {
        "patch": {
          "operationId": "CuratorsController_submitCreatorUpdate",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SubmitCreatorUpdateDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Creator update submission created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SubmitCreatorUpdateResponseDto"
                  }
                }
              }
            },
            "403": {
              "description": "Not assigned to this creator's country"
            },
            "404": {
              "description": "Creator not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Submit a creator update (Curator only)",
          "tags": [
            "Curators - Submission System"
          ]
        }
      },
      "/api/v1/curators/submissions": {
        "get": {
          "operationId": "CuratorsController_getMySubmissions",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number (starts from 1)",
              "schema": {
                "minimum": 1,
                "default": 1,
                "example": 1,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 20,
                "example": 20,
                "type": "number"
              }
            },
            {
              "name": "status",
              "required": false,
              "in": "query",
              "description": "Filter by submission status",
              "schema": {
                "example": "PENDING",
                "type": "string",
                "enum": [
                  "PENDING",
                  "APPROVED",
                  "REJECTED"
                ]
              }
            },
            {
              "name": "curator_id",
              "required": false,
              "in": "query",
              "description": "Filter by curator ID",
              "schema": {
                "example": "550e8400-e29b-41d4-a716-446655440000",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Submissions retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetSubmissionsResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "View own submissions (Curator only)",
          "tags": [
            "Curators - Submission System"
          ]
        }
      },
      "/api/v1/curators/submissions/stats": {
        "get": {
          "operationId": "CuratorsController_getMyStats",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Curator stats retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetCuratorStatsResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Get submission statistics (Curator only)",
          "tags": [
            "Curators - Submission System"
          ]
        }
      },
      "/api/v1/admin/analytics/overview": {
        "get": {
          "operationId": "AnalyticsController_getOverview",
          "parameters": [
            {
              "name": "range",
              "required": false,
              "in": "query",
              "description": "Time range for analytics data",
              "schema": {
                "default": "week",
                "example": "week",
                "type": "string",
                "enum": [
                  "today",
                  "week",
                  "month",
                  "all"
                ]
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Limit number of results",
              "schema": {
                "minimum": 1,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Analytics overview retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetOverviewResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Get analytics overview (total views, visitors, top pages, countries, sources)",
          "tags": [
            "Admin - Analytics"
          ]
        }
      },
      "/api/v1/admin/analytics/traffic-sources": {
        "get": {
          "operationId": "AnalyticsController_getTrafficSources",
          "parameters": [
            {
              "name": "range",
              "required": false,
              "in": "query",
              "description": "Time range for analytics data",
              "schema": {
                "default": "week",
                "example": "week",
                "type": "string",
                "enum": [
                  "today",
                  "week",
                  "month",
                  "all"
                ]
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Limit number of results",
              "schema": {
                "minimum": 1,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Traffic sources retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetTrafficSourcesResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Get traffic sources breakdown",
          "tags": [
            "Admin - Analytics"
          ]
        }
      },
      "/api/v1/admin/analytics/countries": {
        "get": {
          "operationId": "AnalyticsController_getCountries",
          "parameters": [
            {
              "name": "range",
              "required": false,
              "in": "query",
              "description": "Time range for analytics data",
              "schema": {
                "default": "week",
                "example": "week",
                "type": "string",
                "enum": [
                  "today",
                  "week",
                  "month",
                  "all"
                ]
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Limit number of results",
              "schema": {
                "minimum": 1,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Countries retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetCountriesResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Get visitors by country",
          "tags": [
            "Admin - Analytics"
          ]
        }
      },
      "/api/v1/admin/analytics/popular-pages": {
        "get": {
          "operationId": "AnalyticsController_getPopularPages",
          "parameters": [
            {
              "name": "range",
              "required": false,
              "in": "query",
              "description": "Time range for analytics data",
              "schema": {
                "default": "week",
                "example": "week",
                "type": "string",
                "enum": [
                  "today",
                  "week",
                  "month",
                  "all"
                ]
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Limit number of results",
              "schema": {
                "minimum": 1,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Popular pages retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetPopularPagesResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Get most visited pages",
          "tags": [
            "Admin - Analytics"
          ]
        }
      },
      "/api/v1/admin/analytics/unique-visitors": {
        "get": {
          "operationId": "AnalyticsController_getUniqueVisitors",
          "parameters": [
            {
              "name": "range",
              "required": false,
              "in": "query",
              "description": "Time range for analytics data",
              "schema": {
                "default": "week",
                "example": "week",
                "type": "string",
                "enum": [
                  "today",
                  "week",
                  "month",
                  "all"
                ]
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Limit number of results",
              "schema": {
                "minimum": 1,
                "default": 10,
                "example": 10,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Unique visitors retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetUniqueVisitorsResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Get unique visitors count",
          "tags": [
            "Admin - Analytics"
          ]
        }
      },
      "/api/v1/video-rankings/top/{country}": {
        "get": {
          "operationId": "VideoRankingsController_getTopVideos",
          "parameters": [
            {
              "name": "country",
              "required": true,
              "in": "path",
              "description": "Country code",
              "schema": {
                "enum": [
                  "Nigeria",
                  "Ghana",
                  "South_Africa",
                  "Kenya"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Top videos retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetVideoRankingsResponseDto"
                  }
                }
              }
            }
          },
          "summary": "Get published top videos for a country",
          "tags": [
            "Ranking"
          ]
        }
      },
      "/api/v1/video-rankings/viral/{country}": {
        "get": {
          "operationId": "VideoRankingsController_getViralVideos",
          "parameters": [
            {
              "name": "country",
              "required": true,
              "in": "path",
              "description": "Country code",
              "schema": {
                "enum": [
                  "Nigeria",
                  "Ghana",
                  "South_Africa",
                  "Kenya"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Viral videos retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetVideoRankingsResponseDto"
                  }
                }
              }
            }
          },
          "summary": "Get published viral videos for a country",
          "tags": [
            "Ranking"
          ]
        }
      },
      "/api/v1/video-rankings/admin/calculate-top": {
        "post": {
          "operationId": "VideoRankingsController_calculateTopRankings",
          "parameters": [],
          "responses": {
            "201": {
              "description": "Calculation started",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CalculateRankingsResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Trigger top video ranking calculation",
          "tags": [
            "Ranking"
          ]
        }
      },
      "/api/v1/video-rankings/admin/calculate-viral": {
        "post": {
          "operationId": "VideoRankingsController_calculateViralRankings",
          "parameters": [],
          "responses": {
            "201": {
              "description": "Calculation started",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CalculateRankingsResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Trigger viral video ranking calculation",
          "tags": [
            "Ranking"
          ]
        }
      },
      "/api/v1/video-rankings/admin/{id}/publish": {
        "post": {
          "operationId": "VideoRankingsController_publishRanking",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Ranking ID to publish",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Ranking published",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PublishRankingResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Ranking not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ],
          "summary": "Publish a ranking",
          "tags": [
            "Ranking"
          ]
        }
      }
    },
    "info": {
      "title": "Creators Charts MVP API",
      "description": "API documentation for Creators Charts MVP",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "Creators",
        "description": "Creator authentication, profile management, and verification"
      },
      {
        "name": "Ranking",
        "description": "Creator rankings and video rankings endpoints"
      },
      {
        "name": "Claims",
        "description": "Creator claims management"
      },
      {
        "name": "Category Management",
        "description": "Public category endpoints"
      },
      {
        "name": "Country Management",
        "description": "Public country endpoints"
      },
      {
        "name": "Curators - Submission System",
        "description": "Curator submission workflow"
      },
      {
        "name": "Admin - Authentication & Management",
        "description": "Admin authentication and management"
      },
      {
        "name": "Admin - Curator Management",
        "description": "Admin curator management endpoints"
      },
      {
        "name": "Admin - Category Management",
        "description": "Admin category management endpoints"
      },
      {
        "name": "Admin - Country Management",
        "description": "Admin country management endpoints"
      },
      {
        "name": "Admin - Analytics",
        "description": "Admin analytics and reporting"
      }
    ],
    "servers": [
      {
        "url": "https://creatorcharts-backend-production.up.railway.app"
      }
    ],
    "components": {
      "securitySchemes": {
        "cookie": {
          "type": "apiKey",
          "in": "cookie",
          "name": "refresh_token"
        },
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "CreateAdminDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "Admin email address",
              "example": "admin@creatorcharts.com"
            },
            "password": {
              "type": "string",
              "description": "Admin password (minimum 8 characters)",
              "example": "SecureP@$w0rd",
              "minLength": 8
            },
            "full_name": {
              "type": "string",
              "description": "Admin full name",
              "example": "John Doe"
            },
            "role": {
              "type": "string",
              "description": "Admin role (defaults to ADMIN)",
              "enum": [
                "SUPER_ADMIN",
                "ADMIN",
                "CURATOR"
              ],
              "example": "ADMIN",
              "default": "ADMIN"
            }
          },
          "required": [
            "email",
            "password",
            "full_name"
          ]
        },
        "CuratorInfoDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxcurator123456"
            },
            "assigned_countries": {
              "example": [
                "Nigeria",
                "Ghana"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "assigned_countries"
          ]
        },
        "AdminDataDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxadmin123456789"
            },
            "email": {
              "type": "string",
              "example": "admin@example.com"
            },
            "full_name": {
              "type": "string",
              "example": "John Smith"
            },
            "role": {
              "type": "string",
              "example": "ADMIN",
              "enum": [
                "SUPER_ADMIN",
                "ADMIN",
                "CURATOR"
              ]
            },
            "is_active": {
              "type": "boolean",
              "example": true
            },
            "created_at": {
              "format": "date-time",
              "type": "string",
              "example": "2026-01-20T10:30:00.000Z"
            },
            "updated_at": {
              "format": "date-time",
              "type": "string",
              "example": "2026-01-20T10:30:00.000Z"
            },
            "curator": {
              "$ref": "#/components/schemas/CuratorInfoDto"
            }
          },
          "required": [
            "id",
            "email",
            "full_name",
            "role",
            "is_active",
            "created_at"
          ]
        },
        "RegisterAdminResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Admin registered successfully"
            },
            "data": {
              "$ref": "#/components/schemas/AdminDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "LoginAdminDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "Admin email address",
              "example": "admin@creatorcharts.com"
            },
            "password": {
              "type": "string",
              "description": "Admin password",
              "example": "SecureP@$w0rd"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "LoginAdminDataDto": {
          "type": "object",
          "properties": {
            "admin": {
              "type": "object",
              "example": {
                "id": "clxadmin123456789",
                "email": "admin@example.com",
                "full_name": "John Smith",
                "role": "ADMIN"
              }
            },
            "token": {
              "type": "string",
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
          },
          "required": [
            "admin",
            "token"
          ]
        },
        "LoginAdminResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Login successful"
            },
            "data": {
              "$ref": "#/components/schemas/LoginAdminDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "LogoutAdminResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Logout successful"
            }
          },
          "required": [
            "message"
          ]
        },
        "GetAdminProfileResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Profile retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/AdminDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "UpdateAdminDto": {
          "type": "object",
          "properties": {
            "full_name": {
              "type": "string",
              "description": "Admin full name",
              "example": "Jane Smith"
            },
            "email": {
              "type": "string",
              "description": "Admin email address",
              "example": "newemail@creatorcharts.com"
            }
          }
        },
        "UpdateAdminProfileResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Profile updated successfully"
            },
            "data": {
              "$ref": "#/components/schemas/AdminDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "ChangePasswordDto": {
          "type": "object",
          "properties": {
            "current_password": {
              "type": "string",
              "description": "Current password",
              "example": "OldP@$w0rd"
            },
            "new_password": {
              "type": "string",
              "description": "New password (minimum 8 characters)",
              "example": "NewP@$w0rd",
              "minLength": 8
            }
          },
          "required": [
            "current_password",
            "new_password"
          ]
        },
        "ChangePasswordResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Password changed successfully"
            }
          },
          "required": [
            "message"
          ]
        },
        "PaginationMetaDto": {
          "type": "object",
          "properties": {
            "total": {
              "type": "number",
              "example": 50
            },
            "page": {
              "type": "number",
              "example": 1
            },
            "limit": {
              "type": "number",
              "example": 20
            },
            "totalPages": {
              "type": "number",
              "example": 3
            }
          },
          "required": [
            "total",
            "page",
            "limit",
            "totalPages"
          ]
        },
        "ListAdminsDataDto": {
          "type": "object",
          "properties": {
            "admins": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/AdminDataDto"
              }
            },
            "meta": {
              "$ref": "#/components/schemas/PaginationMetaDto"
            }
          },
          "required": [
            "admins",
            "meta"
          ]
        },
        "ListAdminsResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Admins retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/ListAdminsDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "DeleteAdminResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Admin deleted successfully"
            }
          },
          "required": [
            "message"
          ]
        },
        "ToggleAdminStatusResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Admin activated successfully"
            },
            "data": {
              "$ref": "#/components/schemas/AdminDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "InitiateClaimDto": {
          "type": "object",
          "properties": {
            "platform": {
              "type": "string",
              "enum": [
                "tiktok",
                "instagram",
                "youtube",
                "facebook",
                "x"
              ],
              "example": "instagram"
            },
            "handle": {
              "type": "string",
              "example": "instahandle"
            }
          },
          "required": [
            "platform",
            "handle"
          ]
        },
        "ClaimInitiateDataDto": {
          "type": "object",
          "properties": {
            "claimRequestId": {
              "type": "string",
              "example": "clxclaim123456789"
            },
            "verificationCode": {
              "type": "string",
              "example": "CC-A1B2C3D4"
            },
            "expiresAt": {
              "format": "date-time",
              "type": "string",
              "example": "2026-01-20T10:45:00.000Z"
            }
          },
          "required": [
            "claimRequestId",
            "verificationCode",
            "expiresAt"
          ]
        },
        "InitiateClaimResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Claim request initiated"
            },
            "data": {
              "$ref": "#/components/schemas/ClaimInitiateDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "VerifyClaimDto": {
          "type": "object",
          "properties": {
            "claimRequestId": {
              "type": "string",
              "example": "uuid-string"
            }
          },
          "required": [
            "claimRequestId"
          ]
        },
        "VerifyClaimDataDto": {
          "type": "object",
          "properties": {
            "verified": {
              "type": "boolean",
              "example": true
            }
          },
          "required": [
            "verified"
          ]
        },
        "VerifyClaimResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Profile claimed successfully"
            },
            "data": {
              "$ref": "#/components/schemas/VerifyClaimDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "CreateCreatorDto": {
          "type": "object",
          "properties": {
            "first_name": {
              "type": "string",
              "example": "John",
              "description": "The first name of the creator"
            },
            "last_name": {
              "type": "string",
              "example": "Doe",
              "description": "The last name of the creator"
            },
            "email": {
              "type": "string",
              "example": "john.doe@example.com",
              "description": "The email address of the creator"
            },
            "password": {
              "type": "string",
              "example": "P@ssw0rd123",
              "description": "The password for the account (must contain uppercase, lowercase, and number)"
            },
            "display_name": {
              "type": "string",
              "example": "johndoe_creative",
              "description": "The display name/handle of the creator"
            },
            "country": {
              "type": "string",
              "enum": [
                "Nigeria",
                "Ghana",
                "South_Africa",
                "Kenya"
              ],
              "example": "Nigeria",
              "description": "The country of the creator"
            },
            "category": {
              "type": "string",
              "enum": [
                "COMEDY",
                "LIFESTYLE",
                "TECH",
                "MUSIC",
                "GAMING",
                "BUSINESS",
                "EDUCATION"
              ],
              "example": "TECH",
              "description": "The content category of the creator"
            },
            "avatar": {
              "type": "string",
              "example": "https://example.com/avatar.jpg",
              "description": "URL to the creator avatar image"
            },
            "tiktok_handle": {
              "type": "string",
              "example": "johndoe",
              "description": "TikTok username/handle (without @ symbol)"
            },
            "instagram_handle": {
              "type": "string",
              "example": "johndoe_gram",
              "description": "Instagram username/handle (without @ symbol)"
            },
            "youtube_handle": {
              "type": "string",
              "example": "JohnDoeTV",
              "description": "YouTube channel handle or custom URL"
            },
            "x_twitter_handle": {
              "type": "string",
              "example": "johndoe_x",
              "description": "X (Twitter) username/handle (without @ symbol)"
            }
          },
          "required": [
            "first_name",
            "last_name",
            "email",
            "password",
            "display_name",
            "country",
            "category"
          ]
        },
        "RegisterCreatorResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Registration successful. Check your email for confirmation."
            }
          },
          "required": [
            "message"
          ]
        },
        "LoginCreatorDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "john.doe@example.com",
              "description": "The email address of the creator"
            },
            "password": {
              "type": "string",
              "example": "P@ssw0rd123",
              "description": "The password for the account"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "LoginCreatorResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "User logged in successfully"
            }
          },
          "required": [
            "message"
          ]
        },
        "CreatorDataDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clx1234567890abcdef"
            },
            "first_name": {
              "type": "string",
              "example": "John"
            },
            "last_name": {
              "type": "string",
              "example": "Doe"
            },
            "email": {
              "type": "string",
              "example": "john.doe@example.com"
            },
            "display_name": {
              "type": "string",
              "example": "johndoe_creative"
            },
            "country": {
              "type": "string",
              "example": "Nigeria"
            },
            "category": {
              "type": "string",
              "example": "TECH"
            },
            "avatar": {
              "type": "string",
              "example": "https://example.com/avatar.jpg"
            },
            "tiktok_handle": {
              "type": "string",
              "example": "johndoe"
            },
            "instagram_handle": {
              "type": "string",
              "example": "johndoe_gram"
            },
            "youtube_handle": {
              "type": "string",
              "example": "JohnDoeTV"
            },
            "x_twitter_handle": {
              "type": "string",
              "example": "johndoe_x"
            },
            "is_verified": {
              "type": "boolean",
              "example": false
            },
            "is_claimed": {
              "type": "boolean",
              "example": false
            },
            "is_active": {
              "type": "boolean",
              "example": true
            },
            "created_at": {
              "format": "date-time",
              "type": "string",
              "example": "2026-01-20T10:30:00.000Z"
            },
            "updated_at": {
              "format": "date-time",
              "type": "string",
              "example": "2026-01-20T10:30:00.000Z"
            }
          },
          "required": [
            "id",
            "first_name",
            "last_name",
            "email",
            "display_name",
            "country",
            "category",
            "is_verified",
            "is_claimed",
            "is_active",
            "created_at",
            "updated_at"
          ]
        },
        "CreatorProfileResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Profile retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/CreatorDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "RequestVerificationDto": {
          "type": "object",
          "properties": {
            "platform": {
              "type": "string",
              "enum": [
                "tiktok",
                "instagram",
                "youtube",
                "facebook",
                "x"
              ],
              "example": "tiktok",
              "description": "The social media platform to verify"
            }
          },
          "required": [
            "platform"
          ]
        },
        "VerificationCodeDataDto": {
          "type": "object",
          "properties": {
            "verification_code": {
              "type": "string",
              "example": "CC-A1B2C3D4"
            },
            "expires_at": {
              "format": "date-time",
              "type": "string",
              "example": "2026-01-21T10:30:00.000Z"
            }
          },
          "required": [
            "verification_code",
            "expires_at"
          ]
        },
        "RequestVerificationResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Verification code generated successfully. Add this code to your bio on the selected platform."
            },
            "data": {
              "$ref": "#/components/schemas/VerificationCodeDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "VerifyProfileDto": {
          "type": "object",
          "properties": {
            "platform": {
              "type": "string",
              "enum": [
                "tiktok",
                "instagram",
                "youtube",
                "facebook",
                "x"
              ],
              "example": "tiktok",
              "description": "The social media platform to verify"
            }
          },
          "required": [
            "platform"
          ]
        },
        "VerifyProfileResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Profile verified and claimed successfully"
            },
            "data": {
              "$ref": "#/components/schemas/CreatorDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "CreatorSummaryDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clx1234567890abcdef"
            },
            "display_name": {
              "type": "string",
              "example": "johndoe_creative"
            },
            "avatar": {
              "type": "string",
              "example": "https://example.com/avatar.jpg"
            },
            "country": {
              "type": "string",
              "example": "Nigeria"
            },
            "category": {
              "type": "string",
              "example": "TECH"
            }
          },
          "required": [
            "id",
            "display_name",
            "country",
            "category"
          ]
        },
        "RankingEntryDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clx9876543210entry"
            },
            "ranking_id": {
              "type": "string",
              "example": "clxranking123456"
            },
            "creator_id": {
              "type": "string",
              "example": "clx1234567890abcdef"
            },
            "rank": {
              "type": "number",
              "example": 1
            },
            "previous_rank": {
              "type": "number",
              "example": 3
            },
            "cpi_score": {
              "type": "number",
              "example": 85.5
            },
            "movement": {
              "type": "string",
              "example": "UP",
              "enum": [
                "UP",
                "DOWN",
                "SAME",
                "NEW"
              ]
            },
            "creator": {
              "$ref": "#/components/schemas/CreatorSummaryDto"
            }
          },
          "required": [
            "id",
            "ranking_id",
            "creator_id",
            "rank",
            "cpi_score",
            "movement",
            "creator"
          ]
        },
        "WeeklyRankingDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxranking123456"
            },
            "week_number": {
              "type": "number",
              "example": 3
            },
            "year": {
              "type": "number",
              "example": 2026
            },
            "country": {
              "type": "string",
              "example": "Nigeria"
            },
            "category": {
              "type": "string",
              "example": "TECH"
            },
            "status": {
              "type": "string",
              "example": "PUBLISHED",
              "enum": [
                "PENDING",
                "PUBLISHED"
              ]
            },
            "published_at": {
              "format": "date-time",
              "type": "string",
              "example": "2026-01-20T12:00:00.000Z"
            },
            "locked": {
              "type": "boolean",
              "example": true
            },
            "entries": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/RankingEntryDto"
              }
            }
          },
          "required": [
            "id",
            "week_number",
            "year",
            "country",
            "category",
            "status",
            "locked",
            "entries"
          ]
        },
        "GetRankingsResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Rankings retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/WeeklyRankingDto"
              }
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "RankHistoryEntryDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clx9876543210entry"
            },
            "rank": {
              "type": "number",
              "example": 1
            },
            "previous_rank": {
              "type": "number",
              "example": 3
            },
            "cpi_score": {
              "type": "number",
              "example": 85.5
            },
            "movement": {
              "type": "string",
              "example": "UP",
              "enum": [
                "UP",
                "DOWN",
                "SAME",
                "NEW"
              ]
            },
            "ranking": {
              "type": "object",
              "example": {
                "week_number": 3,
                "year": 2026,
                "country": "Nigeria",
                "category": "TECH",
                "status": "PUBLISHED",
                "published_at": "2026-01-20T12:00:00.000Z"
              }
            }
          },
          "required": [
            "id",
            "rank",
            "cpi_score",
            "movement",
            "ranking"
          ]
        },
        "GetCreatorHistoryResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Creator rank history retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/RankHistoryEntryDto"
              }
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "TriggerRankingDataDto": {
          "type": "object",
          "properties": {
            "jobId": {
              "type": "string",
              "example": "job_123456789"
            }
          },
          "required": [
            "jobId"
          ]
        },
        "TriggerRankingResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Ranking calculation job queued"
            },
            "data": {
              "$ref": "#/components/schemas/TriggerRankingDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "PublishRankingsResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Rankings published successfully"
            },
            "data": {
              "$ref": "#/components/schemas/WeeklyRankingDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "ActiveCountryDto": {
          "type": "object",
          "properties": {
            "country": {
              "type": "string",
              "example": "Nigeria"
            },
            "rollout_date": {
              "format": "date-time",
              "type": "string",
              "example": "2026-02-01T00:00:00.000Z"
            }
          },
          "required": [
            "country"
          ]
        },
        "GetActiveCountriesResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Active countries retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ActiveCountryDto"
              }
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "CountryListItemDto": {
          "type": "object",
          "properties": {
            "country": {
              "type": "string",
              "example": "Nigeria"
            },
            "is_enabled": {
              "type": "boolean",
              "example": true
            },
            "is_active": {
              "type": "boolean",
              "example": true
            },
            "rollout_date": {
              "format": "date-time",
              "type": "string",
              "example": "2026-02-01T00:00:00.000Z"
            },
            "id": {
              "type": "string",
              "example": "clxcountry123456"
            }
          },
          "required": [
            "country",
            "is_enabled",
            "is_active"
          ]
        },
        "ListCountriesResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Countries retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CountryListItemDto"
              }
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "EnableCountryDto": {
          "type": "object",
          "properties": {
            "country": {
              "type": "string",
              "description": "Country to enable",
              "enum": [
                "Nigeria",
                "Ghana",
                "South_Africa",
                "Kenya"
              ],
              "example": "Nigeria"
            }
          },
          "required": [
            "country"
          ]
        },
        "CountryConfigDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxcountry123456"
            },
            "country": {
              "type": "string",
              "example": "Nigeria"
            },
            "is_enabled": {
              "type": "boolean",
              "example": true
            },
            "is_active": {
              "type": "boolean",
              "example": true
            },
            "rollout_date": {
              "format": "date-time",
              "type": "string",
              "example": "2026-02-01T00:00:00.000Z"
            }
          },
          "required": [
            "id",
            "country",
            "is_enabled",
            "is_active"
          ]
        },
        "EnableCountryResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Country enabled successfully"
            },
            "data": {
              "$ref": "#/components/schemas/CountryConfigDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "DisableCountryDto": {
          "type": "object",
          "properties": {
            "country": {
              "type": "string",
              "description": "Country to disable",
              "enum": [
                "Nigeria",
                "Ghana",
                "South_Africa",
                "Kenya"
              ],
              "example": "Ghana"
            }
          },
          "required": [
            "country"
          ]
        },
        "DisableCountryResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Country disabled successfully"
            },
            "data": {
              "$ref": "#/components/schemas/CountryConfigDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "SetActiveCountryDto": {
          "type": "object",
          "properties": {
            "country": {
              "type": "string",
              "description": "Country to set as active/inactive",
              "enum": [
                "Nigeria",
                "Ghana",
                "South_Africa",
                "Kenya"
              ],
              "example": "Nigeria"
            },
            "is_active": {
              "type": "boolean",
              "description": "Whether the country should be active for current ranking cycle",
              "example": true
            }
          },
          "required": [
            "country",
            "is_active"
          ]
        },
        "SetActiveStatusResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Country activated successfully"
            },
            "data": {
              "$ref": "#/components/schemas/CountryConfigDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "SetRolloutDateDto": {
          "type": "object",
          "properties": {
            "country": {
              "type": "string",
              "description": "Country to set rollout date for",
              "enum": [
                "Nigeria",
                "Ghana",
                "South_Africa",
                "Kenya"
              ],
              "example": "Kenya"
            },
            "rollout_date": {
              "type": "string",
              "description": "Rollout date in ISO 8601 format",
              "example": "2026-02-01T00:00:00Z"
            }
          },
          "required": [
            "country",
            "rollout_date"
          ]
        },
        "SetRolloutDateResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Rollout date set successfully"
            },
            "data": {
              "$ref": "#/components/schemas/CountryConfigDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "ActiveCategoryDto": {
          "type": "object",
          "properties": {
            "category": {
              "type": "string",
              "example": "TECH"
            },
            "is_enabled": {
              "type": "boolean",
              "example": true
            }
          },
          "required": [
            "category",
            "is_enabled"
          ]
        },
        "GetActiveCategoriesResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Active categories retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ActiveCategoryDto"
              }
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "CategoryListItemDto": {
          "type": "object",
          "properties": {
            "category": {
              "type": "string",
              "example": "TECH"
            },
            "country": {
              "type": "string",
              "example": "Nigeria"
            },
            "is_enabled": {
              "type": "boolean",
              "example": true
            },
            "id": {
              "type": "string",
              "example": "clxcategory123456"
            }
          },
          "required": [
            "category",
            "country",
            "is_enabled"
          ]
        },
        "ListCategoriesResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Categories retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CategoryListItemDto"
              }
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "EnableCategoryDto": {
          "type": "object",
          "properties": {
            "country": {
              "type": "string",
              "description": "Country for which to enable the category",
              "enum": [
                "Nigeria",
                "Ghana",
                "South_Africa",
                "Kenya"
              ],
              "example": "Nigeria"
            },
            "category": {
              "type": "string",
              "description": "Category to enable",
              "enum": [
                "COMEDY",
                "LIFESTYLE",
                "TECH",
                "MUSIC",
                "GAMING",
                "BUSINESS",
                "EDUCATION"
              ],
              "example": "COMEDY"
            }
          },
          "required": [
            "country",
            "category"
          ]
        },
        "CategoryConfigDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxcategory123456"
            },
            "country": {
              "type": "string",
              "example": "Nigeria"
            },
            "category": {
              "type": "string",
              "example": "TECH"
            },
            "is_enabled": {
              "type": "boolean",
              "example": true
            }
          },
          "required": [
            "id",
            "country",
            "category",
            "is_enabled"
          ]
        },
        "EnableCategoryResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Category enabled successfully"
            },
            "data": {
              "$ref": "#/components/schemas/CategoryConfigDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "DisableCategoryDto": {
          "type": "object",
          "properties": {
            "country": {
              "type": "string",
              "description": "Country for which to disable the category",
              "enum": [
                "Nigeria",
                "Ghana",
                "South_Africa",
                "Kenya"
              ],
              "example": "Nigeria"
            },
            "category": {
              "type": "string",
              "description": "Category to disable",
              "enum": [
                "COMEDY",
                "LIFESTYLE",
                "TECH",
                "MUSIC",
                "GAMING",
                "BUSINESS",
                "EDUCATION"
              ],
              "example": "GAMING"
            }
          },
          "required": [
            "country",
            "category"
          ]
        },
        "DisableCategoryResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Category disabled successfully"
            },
            "data": {
              "$ref": "#/components/schemas/CategoryConfigDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "CreateCuratorDto": {
          "type": "object",
          "properties": {
            "admin_id": {
              "type": "string",
              "description": "Admin ID to convert to curator",
              "example": "550e8400-e29b-41d4-a716-446655440000"
            },
            "assigned_countries": {
              "type": "array",
              "description": "Countries assigned to this curator",
              "example": [
                "Nigeria",
                "Ghana"
              ],
              "items": {
                "type": "string",
                "enum": [
                  "Nigeria",
                  "Ghana",
                  "South_Africa",
                  "Kenya"
                ]
              }
            }
          },
          "required": [
            "admin_id",
            "assigned_countries"
          ]
        },
        "AdminSummaryDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxadmin123456789"
            },
            "email": {
              "type": "string",
              "example": "admin@example.com"
            },
            "full_name": {
              "type": "string",
              "example": "John Smith"
            },
            "role": {
              "type": "string",
              "example": "CURATOR",
              "enum": [
                "SUPER_ADMIN",
                "ADMIN",
                "CURATOR"
              ]
            },
            "is_active": {
              "type": "boolean",
              "example": true
            }
          },
          "required": [
            "id",
            "email",
            "full_name",
            "role",
            "is_active"
          ]
        },
        "CuratorDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxcurator123456"
            },
            "admin_id": {
              "type": "string",
              "example": "clxadmin123456789"
            },
            "assigned_countries": {
              "example": [
                "Nigeria",
                "Ghana"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "created_at": {
              "format": "date-time",
              "type": "string",
              "example": "2026-01-20T10:30:00.000Z"
            },
            "admin": {
              "$ref": "#/components/schemas/AdminSummaryDto"
            }
          },
          "required": [
            "id",
            "admin_id",
            "assigned_countries",
            "created_at",
            "admin"
          ]
        },
        "CreateCuratorResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Curator created successfully"
            },
            "data": {
              "$ref": "#/components/schemas/CuratorDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "ListCuratorsResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Curators retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CuratorDto"
              }
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "AssignCountriesDto": {
          "type": "object",
          "properties": {
            "countries": {
              "type": "array",
              "description": "Countries to assign to the curator",
              "example": [
                "Kenya"
              ],
              "items": {
                "type": "string",
                "enum": [
                  "Nigeria",
                  "Ghana",
                  "South_Africa",
                  "Kenya"
                ]
              }
            }
          },
          "required": [
            "countries"
          ]
        },
        "AssignCountriesResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Countries assigned successfully"
            },
            "data": {
              "$ref": "#/components/schemas/CuratorDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "DeleteCuratorResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Curator deleted successfully"
            }
          },
          "required": [
            "message"
          ]
        },
        "PendingSubmissionDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxsubmission123456"
            },
            "curator_id": {
              "type": "string",
              "example": "clxcurator123456"
            },
            "type": {
              "type": "string",
              "example": "CREATE_CREATOR",
              "enum": [
                "CREATE_CREATOR",
                "UPDATE_CREATOR"
              ]
            },
            "status": {
              "type": "string",
              "example": "PENDING",
              "enum": [
                "PENDING",
                "APPROVED",
                "REJECTED"
              ]
            },
            "creator_id": {
              "type": "string",
              "example": "clxcreator123456"
            },
            "creator_data": {
              "type": "object",
              "example": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "creator@example.com",
                "display_name": "johndoe",
                "country": "Nigeria",
                "category": "TECH"
              }
            },
            "rejection_reason": {
              "type": "string",
              "example": "Duplicate entry"
            },
            "reviewed_by": {
              "type": "string",
              "example": "clxadmin123456789"
            },
            "reviewed_at": {
              "format": "date-time",
              "type": "string",
              "example": "2026-01-20T12:00:00.000Z"
            },
            "created_at": {
              "format": "date-time",
              "type": "string",
              "example": "2026-01-20T10:30:00.000Z"
            }
          },
          "required": [
            "id",
            "curator_id",
            "type",
            "status",
            "creator_data",
            "created_at"
          ]
        },
        "SubmissionsListDataDto": {
          "type": "object",
          "properties": {
            "submissions": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/PendingSubmissionDto"
              }
            },
            "meta": {
              "$ref": "#/components/schemas/PaginationMetaDto"
            }
          },
          "required": [
            "submissions",
            "meta"
          ]
        },
        "GetSubmissionsResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Submissions retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/SubmissionsListDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "ApproveSubmissionDto": {
          "type": "object",
          "properties": {
            "admin_notes": {
              "type": "string",
              "description": "Admin notes for the approval",
              "example": "Verified creator credentials"
            }
          }
        },
        "ApproveSubmissionResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Submission approved successfully"
            },
            "data": {
              "type": "object",
              "description": "Created or updated creator data",
              "example": {
                "id": "clxcreator123456",
                "display_name": "johndoe",
                "country": "Nigeria",
                "category": "TECH"
              }
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "RejectSubmissionDto": {
          "type": "object",
          "properties": {
            "reason": {
              "type": "string",
              "description": "Reason for rejecting the submission",
              "example": "Creator does not meet minimum follower requirements"
            }
          },
          "required": [
            "reason"
          ]
        },
        "RejectSubmissionResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Submission rejected successfully"
            },
            "data": {
              "$ref": "#/components/schemas/PendingSubmissionDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "SubmitCreatorDto": {
          "type": "object",
          "properties": {
            "first_name": {
              "type": "string",
              "description": "Creator first name",
              "example": "John"
            },
            "last_name": {
              "type": "string",
              "description": "Creator last name",
              "example": "Doe"
            },
            "email": {
              "type": "string",
              "description": "Creator email address",
              "example": "johndoe@example.com"
            },
            "password": {
              "type": "string",
              "description": "Creator password (minimum 8 characters)",
              "example": "Password123!",
              "minLength": 8
            },
            "display_name": {
              "type": "string",
              "description": "Creator display name (public name)",
              "example": "JohnnyComedy"
            },
            "country": {
              "type": "string",
              "description": "Creator country",
              "enum": [
                "Nigeria",
                "Ghana",
                "South_Africa",
                "Kenya"
              ],
              "example": "Nigeria"
            },
            "category": {
              "type": "string",
              "description": "Creator category",
              "enum": [
                "COMEDY",
                "LIFESTYLE",
                "TECH",
                "MUSIC",
                "GAMING",
                "BUSINESS",
                "EDUCATION"
              ],
              "example": "COMEDY"
            },
            "avatar": {
              "type": "string",
              "description": "Profile avatar URL",
              "example": "https://example.com/avatar.jpg"
            },
            "tiktok_handle": {
              "type": "string",
              "description": "TikTok username",
              "example": "@johndoecomedy"
            },
            "instagram_handle": {
              "type": "string",
              "description": "Instagram username",
              "example": "@johndoecomedy"
            },
            "youtube_handle": {
              "type": "string",
              "description": "YouTube channel handle",
              "example": "@JohnDoeComedy"
            },
            "x_twitter_handle": {
              "type": "string",
              "description": "X (Twitter) handle",
              "example": "@johndoecomedy"
            },
            "is_verified": {
              "type": "boolean",
              "description": "Whether the creator is verified",
              "example": true,
              "default": false
            },
            "is_claimed": {
              "type": "boolean",
              "description": "Whether the profile is claimed",
              "example": true,
              "default": false
            },
            "curator_notes": {
              "type": "string",
              "description": "Curator notes or justification for this submission",
              "example": "Trending creator with 500K TikTok followers"
            }
          },
          "required": [
            "first_name",
            "last_name",
            "email",
            "password",
            "display_name",
            "country",
            "category"
          ]
        },
        "SubmitCreatorResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Creator submission created successfully"
            },
            "data": {
              "$ref": "#/components/schemas/PendingSubmissionDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "SubmitCreatorUpdateDto": {
          "type": "object",
          "properties": {
            "creator_id": {
              "type": "string",
              "description": "Creator ID to update",
              "example": "550e8400-e29b-41d4-a716-446655440000"
            },
            "updates": {
              "type": "object",
              "description": "Updated creator data",
              "additionalProperties": true
            },
            "curator_notes": {
              "type": "string",
              "description": "Curator notes explaining the changes",
              "example": "Updated social media handles after profile migration"
            }
          },
          "required": [
            "creator_id",
            "updates"
          ]
        },
        "SubmitCreatorUpdateResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Creator update submission created successfully"
            },
            "data": {
              "$ref": "#/components/schemas/PendingSubmissionDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "CuratorStatsDataDto": {
          "type": "object",
          "properties": {
            "total_submissions": {
              "type": "number",
              "example": 50
            },
            "pending": {
              "type": "number",
              "example": 10
            },
            "approved": {
              "type": "number",
              "example": 35
            },
            "rejected": {
              "type": "number",
              "example": 5
            },
            "approval_rate": {
              "type": "string",
              "example": "70.00"
            }
          },
          "required": [
            "total_submissions",
            "pending",
            "approved",
            "rejected",
            "approval_rate"
          ]
        },
        "GetCuratorStatsResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Curator stats retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/CuratorStatsDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "PageViewDto": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string",
              "example": "/rankings/nigeria"
            },
            "views": {
              "type": "number",
              "example": 1250
            }
          },
          "required": [
            "path",
            "views"
          ]
        },
        "CountryViewDto": {
          "type": "object",
          "properties": {
            "country": {
              "type": "string",
              "example": "Nigeria"
            },
            "views": {
              "type": "number",
              "example": 850
            }
          },
          "required": [
            "country",
            "views"
          ]
        },
        "TrafficSourceDto": {
          "type": "object",
          "properties": {
            "source": {
              "type": "string",
              "example": "SOCIAL",
              "enum": [
                "DIRECT",
                "SOCIAL",
                "SEARCH",
                "EMAIL",
                "REFERRAL"
              ]
            },
            "views": {
              "type": "number",
              "example": 500
            }
          },
          "required": [
            "source",
            "views"
          ]
        },
        "OverviewDataDto": {
          "type": "object",
          "properties": {
            "total_views": {
              "type": "number",
              "example": 5000
            },
            "unique_visitors": {
              "type": "number",
              "example": 1200
            },
            "top_pages": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/PageViewDto"
              }
            },
            "top_countries": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CountryViewDto"
              }
            },
            "traffic_sources": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/TrafficSourceDto"
              }
            }
          },
          "required": [
            "total_views",
            "unique_visitors",
            "top_pages",
            "top_countries",
            "traffic_sources"
          ]
        },
        "GetOverviewResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Analytics overview retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/OverviewDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "TrafficSourceWithPercentageDto": {
          "type": "object",
          "properties": {
            "source": {
              "type": "string",
              "example": "SOCIAL",
              "enum": [
                "DIRECT",
                "SOCIAL",
                "SEARCH",
                "EMAIL",
                "REFERRAL"
              ]
            },
            "views": {
              "type": "number",
              "example": 500
            },
            "percentage": {
              "type": "string",
              "example": "35.50"
            }
          },
          "required": [
            "source",
            "views",
            "percentage"
          ]
        },
        "GetTrafficSourcesResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Traffic sources retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/TrafficSourceWithPercentageDto"
              }
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "GetCountriesResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Countries retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CountryViewDto"
              }
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "GetPopularPagesResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Popular pages retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/PageViewDto"
              }
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "UniqueVisitorsDataDto": {
          "type": "object",
          "properties": {
            "unique_visitors": {
              "type": "number",
              "example": 1200
            },
            "total_sessions": {
              "type": "number",
              "example": 1500
            },
            "returning_visitors": {
              "type": "number",
              "example": 300
            }
          },
          "required": [
            "unique_visitors",
            "total_sessions",
            "returning_visitors"
          ]
        },
        "GetUniqueVisitorsResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Unique visitors retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/UniqueVisitorsDataDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "VideoCreatorDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxcreator123456"
            },
            "display_name": {
              "type": "string",
              "example": "johndoe_creative"
            },
            "avatar": {
              "type": "string",
              "example": "https://example.com/avatar.jpg"
            },
            "country": {
              "type": "string",
              "example": "Nigeria"
            },
            "category": {
              "type": "string",
              "example": "TECH"
            }
          },
          "required": [
            "id",
            "display_name",
            "country",
            "category"
          ]
        },
        "VideoDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxvideo123456789"
            },
            "creator_id": {
              "type": "string",
              "example": "clxcreator123456"
            },
            "platform": {
              "type": "string",
              "example": "tiktok"
            },
            "platform_video_id": {
              "type": "string",
              "example": "7123456789012345678"
            },
            "url": {
              "type": "string",
              "example": "https://tiktok.com/@johndoe/video/123"
            },
            "thumbnail_url": {
              "type": "string",
              "example": "https://example.com/thumb.jpg"
            },
            "title": {
              "type": "string",
              "example": "My amazing video"
            },
            "posted_at": {
              "format": "date-time",
              "type": "string",
              "example": "2026-01-18T10:30:00.000Z"
            },
            "creator": {
              "$ref": "#/components/schemas/VideoCreatorDto"
            }
          },
          "required": [
            "id",
            "creator_id",
            "platform",
            "platform_video_id",
            "posted_at",
            "creator"
          ]
        },
        "VideoRankingEntryDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxentry123456789"
            },
            "ranking_id": {
              "type": "string",
              "example": "clxranking123456"
            },
            "video_id": {
              "type": "string",
              "example": "clxvideo123456789"
            },
            "rank": {
              "type": "number",
              "example": 1
            },
            "score": {
              "type": "number",
              "example": 92.5
            },
            "weekly_views": {
              "type": "number",
              "example": 1500000
            },
            "weekly_engagement": {
              "type": "number",
              "example": 250000
            },
            "consistency_score": {
              "type": "number",
              "example": 0.85
            },
            "view_growth_rate": {
              "type": "number",
              "example": 1.5
            },
            "engagement_velocity": {
              "type": "number",
              "example": 5000.5
            },
            "share_rate": {
              "type": "number",
              "example": 0.02
            },
            "movement": {
              "type": "string",
              "example": "NEW",
              "enum": [
                "UP",
                "DOWN",
                "SAME",
                "NEW"
              ]
            },
            "previous_rank": {
              "type": "number",
              "example": 3
            },
            "video": {
              "$ref": "#/components/schemas/VideoDto"
            }
          },
          "required": [
            "id",
            "ranking_id",
            "video_id",
            "rank",
            "score",
            "weekly_views",
            "weekly_engagement",
            "movement",
            "video"
          ]
        },
        "VideoRankingDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxranking123456"
            },
            "week_number": {
              "type": "number",
              "example": 3
            },
            "year": {
              "type": "number",
              "example": 2026
            },
            "country": {
              "type": "string",
              "example": "Nigeria"
            },
            "ranking_type": {
              "type": "string",
              "example": "TOP",
              "enum": [
                "TOP",
                "VIRAL"
              ]
            },
            "status": {
              "type": "string",
              "example": "PUBLISHED",
              "enum": [
                "PENDING",
                "PUBLISHED",
                "DRAFT"
              ]
            },
            "published_at": {
              "format": "date-time",
              "type": "string",
              "example": "2026-01-20T12:00:00.000Z"
            },
            "entries": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/VideoRankingEntryDto"
              }
            }
          },
          "required": [
            "id",
            "week_number",
            "year",
            "country",
            "ranking_type",
            "status",
            "entries"
          ]
        },
        "GetVideoRankingsResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Rankings retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/VideoRankingDto"
            }
          },
          "required": [
            "message"
          ]
        },
        "VideoRankingBasicDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "clxranking123456"
            },
            "week_number": {
              "type": "number",
              "example": 3
            },
            "year": {
              "type": "number",
              "example": 2026
            },
            "country": {
              "type": "string",
              "example": "Nigeria"
            },
            "ranking_type": {
              "type": "string",
              "example": "TOP",
              "enum": [
                "TOP",
                "VIRAL"
              ]
            },
            "status": {
              "type": "string",
              "example": "PENDING",
              "enum": [
                "PENDING",
                "PUBLISHED",
                "DRAFT"
              ]
            }
          },
          "required": [
            "id",
            "week_number",
            "year",
            "country",
            "ranking_type",
            "status"
          ]
        },
        "CalculateRankingsResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Top Video rankings calculated successfully"
            },
            "data": {
              "$ref": "#/components/schemas/VideoRankingBasicDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        },
        "PublishRankingResponseDto": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Ranking published successfully"
            },
            "data": {
              "$ref": "#/components/schemas/VideoRankingBasicDto"
            }
          },
          "required": [
            "message",
            "data"
          ]
        }
      }
    }
  },
  "customOptions": {
    "withCredentials": true
  }
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
