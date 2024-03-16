import { TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";

const values: { [key in TRPC_ERROR_CODE_KEY]: number } = {
  BAD_REQUEST: 400,
  PARSE_ERROR: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  METHOD_NOT_SUPPORTED: 405,
  TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
};

export function codeToTrpcErrorKey(code: number): TRPC_ERROR_CODE_KEY {
  for (const key of Object.keys(values)) {
    const value = values[key as TRPC_ERROR_CODE_KEY];
    if (value == code) return key as TRPC_ERROR_CODE_KEY;
  }
  return "INTERNAL_SERVER_ERROR";
}

export function trpcErrorKeyToCode(key: TRPC_ERROR_CODE_KEY): number {
  return values[key] || 500;
}
