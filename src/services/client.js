import { config, isApiConfigured } from "./config";

/**
 * Structured API error for safe UI rendering.
 * Does not expose stack traces or internal details to users.
 */
export class ApiError extends Error {
  constructor(message, { status, code, details } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * HTTP client for API requests.
 * Handles JSON serialization, error parsing, and network failures.
 */
async function request(method, path, body, options = {}) {
  if (!isApiConfigured()) {
    throw new ApiError(
      "API endpoint not configured. Please set VITE_API_BASE_URL environment variable.",
      { code: "API_NOT_CONFIGURED" }
    );
  }

  const url = `${config.apiBaseUrl.replace(/\/$/, "")}${path}`;
  
  let res;
  try {
    res = await fetch(url, {
      method,
      headers: { 
        "Content-Type": "application/json",
        ...options.headers 
      },
      body: body != null ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new ApiError(
      "A network error occurred. Please check your connection and try again.",
      { code: "NETWORK_ERROR" }
    );
  }

  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message = data?.message || data?.error || "The request could not be completed.";
    throw new ApiError(message, { 
      status: res.status, 
      code: data?.code, 
      details: data 
    });
  }
  
  return data;
}

export const client = {
  get: (path, opts) => request("GET", path, null, opts),
  post: (path, body, opts) => request("POST", path, body, opts),
  put: (path, body, opts) => request("PUT", path, body, opts),
  patch: (path, body, opts) => request("PATCH", path, body, opts),
  delete: (path, opts) => request("DELETE", path, null, opts),
};
