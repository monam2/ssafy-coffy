export type ApiError = { message: string; code?: string };
export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

export type DateString = string;
