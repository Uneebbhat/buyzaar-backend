import { Response } from "express";

class ResponseHandler {
  static send(
    res: Response,
    statusCode: number,
    message: string,
    data = {},
    token = {}
  ) {
    return res.status(statusCode).json({
      statusCode,
      message,
      data,
      token,
      success: true,
    });
  }
}

export default ResponseHandler;
