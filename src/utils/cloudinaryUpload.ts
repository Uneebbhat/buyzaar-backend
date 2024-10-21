import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/cloudinaryConfig";

cloudinaryConfig();

const cloudinaryUpload = async (filepath: string, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filepath, options);
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default cloudinaryUpload;
