import { NextFunction, Request, Response } from "express";
import UploadProductSchema from "../schemas/UploadProductSchema";
import UploadProduct from "../models/UploadProduct.model";

export const uploadProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = UploadProductSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed.",
        errors: error.details.map((err) => err.message),
      });
    }

    const newProduct = new UploadProduct(value);
    const savedProduct = await newProduct.save();

    res.status(201).json({
      status: "success",
      message: "Product uploaded successfully.",
      data: savedProduct,
    });
  } catch (err) {
    console.error("Upload Product Error:", err);
    next(err);
  }
};
