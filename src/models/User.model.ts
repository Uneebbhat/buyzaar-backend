import mongoose, { Schema, Document, Model } from "mongoose";

enum Role {
  Seller = "seller",
  Buyer = "buyer",
}

interface User extends Document {
  name: string;
  email: string;
  password: string;
  profilePic: string;
  role: Role;
  phoneNumber: string;
}

const userModel: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/djeifetdm/image/upload/v1726657038/default.jpg",
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.Buyer,
    },
    phoneNumber: {
      type: String,
      default: "",
      // unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userModel);

export default User;
