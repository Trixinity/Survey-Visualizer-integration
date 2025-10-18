// The Open Trivia DB API URL
const API_URL = "https://opentdb.com/api.php?amount=50"

export class ApiError extends Error {
  status: number; // HTTP status code from the failed request
  data: unknown; // Additional error data from the API response

  /**
   * Create a new API error instance
   * @param status - HTTP status code
   * @param message - Error message
   * @param data - Optional additional error data from API response
   */
  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Maps Open Trivia DB response codes to provided messages
 */
const ERROR_MESSAGES: Record<number, string> = {
  1: "No Results: Could not return results. The API doesn't have enough questions for your query.",
  2: "Invalid Parameter: Contains an invalid parameter. Arguments passed are not valid.",
  3: "Token Not Found: Session Token does not exist.",
  4: "Token Empty: Session Token has returned all possible questions for the specified query.",
  5: "Rate Limit: Too many requests have occurred. Each IP can only access the API once every 5 seconds."
};

/**
 * For now this function only supports GET requests without authentication.
 * It can be extended in the future to support other methods and auth if needed.
 * @returns Parsed JSON response from the API
 */
export async function apiRequest<R>(): Promise<R> {
  try {
    const response = await fetch(`${API_URL}`);

    // Handle non-successful HTTP responses
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = null;
      }

      const errorMessage = () => {
        if (errorData == null) {
          return `Unknown error occurred`;
        }
        return ERROR_MESSAGES[errorData.response_code];
      }
      console.error(`API Error (${response.status}):`, errorMessage, errorData);
      throw new ApiError(response.status, errorMessage(), errorData);
    }

    let data: any = await response.json();

    // 200 OK but response_code indicates an error
    if (data && typeof data === "object" && "response_code" in data && data.response_code !== 0) {
      const errorMessage = ERROR_MESSAGES[data.response_code] || `Unknown error occurred`;
      console.error(`API Error (${response.status}):`, errorMessage, data);
      throw new ApiError(200, errorMessage, data);
    }

    return data as R;
  } catch (error) {
    if (!(error instanceof ApiError)) {
      console.error("Request failed:", error);
      throw new ApiError(0, error instanceof Error ? error.message : "Network error", null);
    }
    throw error;
  }
}

/**
 * Decodes HTML entities in a given text string.
 * @param text - The text containing HTML entities to decode.
 * @returns The decoded text.
 */
export function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}