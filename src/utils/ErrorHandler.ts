import { Response } from "express";

class ErrorHandler {
  static send(res: Response, statusCode: number, error: string) {
    return res.status(statusCode).json({
      statusCode,
      error,
      success: false,
    });
  }
}

export default ErrorHandler;
