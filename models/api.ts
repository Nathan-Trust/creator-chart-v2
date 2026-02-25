/**
 * Shared API response types matching the actual backend response shapes.
 *
 * The backend consistently uses these wrapper patterns:
 * - Simple: { success, data: T, message }
 * - Paginated: { success, data: { data: T[], total, page, limit, totalPages }, message }
 */

/**
 * Base API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Paginated data envelope (the inner `data` object)
 */
export interface PaginatedData<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Full paginated API response: { success, data: { data: T[], total, page, limit, totalPages }, message }
 */
export type PaginatedApiResponse<T> = ApiResponse<PaginatedData<T>>;

/**
 * Common pagination query params
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}
