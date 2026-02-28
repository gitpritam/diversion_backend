import { Response } from "express";

/**
 * Utility function to send a consistent API response.
 *
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code (e.g., 200, 201, 400, 500)
 * @param {boolean} success - Indicates whether the request was successful
 * @param {string} message - Descriptive message about the response
 * @param {Record<string, any>} [result={}] - Object containing response data (default: empty object)
 * @param {any | null} [errors=null] - Error details (only included if success=false)
 * @returns {void} - Sends JSON response to the client
 */
const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  result: Record<string, any> = {}, // Ensures result is always an object
  errors: any | null = null
): void => {
  const response: Record<string, any> = { success, message, result };

  if (!success && errors) {
    response.errors = errors; // Include errors only on failure
  }

  res.status(statusCode).json(response);
};

export default sendResponse;
