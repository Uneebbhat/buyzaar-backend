import mongoose, { Document, Schema, Model } from "mongoose";

interface UploadProducts extends Document {
  category: string;
  subcategory: string;
  details?: { [key: string]: any };
}

const uploadProductModel: Schema<UploadProducts> = new Schema(
  {
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    details: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
  }
);

const UploadProduct: Model<UploadProducts> =
  mongoose.models.UploadProducts ||
  mongoose.model<UploadProducts>("UploadProducts", uploadProductModel);

export default UploadProduct;
