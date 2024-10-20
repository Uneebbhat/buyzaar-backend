import { NextFunction, Request, Response } from "express";
import UploadProductSchema from "../schemas/UploadProductSchema";
import UploadProduct from "../models/UploadProduct.model";
import cloudinaryUpload from "../utils/cloudinaryUpload";

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

    const { images, ...productDetails } = value;
    const imageUrls: string[] = [];

    if (images && images.length > 10) {
      return res.status(400).json({
        status: "error",
        message: "You can upload a maximum of 10 images.",
      });
    }

    if (images && images.length > 0) {
      for (const image of images) {
        const uploadedImage = await cloudinaryUpload(image.path, {
          folder: "buynex/product_images",
        });
        imageUrls.push(uploadedImage.secure_url);
      }
    }

    const newProduct = new UploadProduct({
      ...productDetails,
      images: imageUrls,
    });

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
