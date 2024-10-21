import { NextFunction, Request, Response } from "express";
import UploadProductSchema from "../schemas/UploadProductSchema";
import UploadProduct from "../models/UploadProduct.model";
import cloudinaryUpload from "../utils/cloudinaryUpload";
import ResponseHandler from "../utils/ResponseHandler";
import ErrorHandler from "../utils/ErrorHandler";

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

    console.log("Files received:", req.files);
    const files = req.files as Express.Multer.File[];

    if (!files || files.length < 1) {
      return ErrorHandler.send(res, 400, "At least one image is required.");
    }

    if (files.length > 10) {
      return ErrorHandler.send(
        res,
        400,
        "You can upload a maximum of 10 images."
      );
    }

    const imageUrls: string[] = [];

    for (const file of files) {
      const uploadedImage = await cloudinaryUpload(file.path, {
        folder: "buyzaar/product_images",
      });
      imageUrls.push(uploadedImage.secure_url);
    }

    const { images, ...productDetails } = value;

    const newProduct = new UploadProduct({
      ...productDetails,
      images: imageUrls,
    });

    const savedProduct = await newProduct.save();
    const productDetailsObject = savedProduct.toObject();

    console.log("Saved Product:", productDetailsObject);

    return ResponseHandler.send(
      res,
      201,
      "Product uploaded successfully.",
      productDetailsObject
    );
  } catch (err) {
    console.error("Upload Product Error:", err);
    return ErrorHandler.send(res, 500, "Internal Server Error");
  }
};
