import mongoose, { Schema, Document } from "mongoose";

interface OTP extends Document {
  otp: string;
  otpExpires: Date;
  userId: mongoose.Schema.Types.ObjectId;
}

const otpModel = new Schema<OTP>(
  {
    otp: {
      type: String,
      required: true,
    },
    otpExpires: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model<OTP>("OTP", otpModel);

export default OTP;
