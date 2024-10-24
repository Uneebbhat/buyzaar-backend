import mongoose, { Document, Schema, Types } from "mongoose";

interface IShop extends Document {
  userId: Types.ObjectId;
  shopName: string;
  shopPicture: string;
}

const shopModel: Schema<IShop> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shopName: {
      type: String,
      required: true,
    },
    shopPicture: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Shop =
  (mongoose.models.Shop as mongoose.Model<IShop>) ||
  mongoose.model<IShop>("Shop", shopModel);
