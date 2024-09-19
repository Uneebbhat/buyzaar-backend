import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status: number = 500;
  let data = {
    message: "Internal Server Error",
  };

  if (error instanceof ValidationError) {
    status = 400;
    data.message = error.message;
    return res.status(status).json(data);
  }

  if (error.status) {
    status = error.status;
  }

  if (error.message) {
    data.message = error.message;
  }

  return res.status(status).json(data);
};

export default errorHandler;
