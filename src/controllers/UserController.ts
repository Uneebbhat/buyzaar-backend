import { NextFunction, Request, Response } from "express";
import ResponseHandler from "../utils/ResponseHandler";
import UserSchema from "../schemas/UserSchema";
import ErrorHandler from "../utils/ErrorHandler";
import User from "../models/User.model";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";
import LoginSchema from "../schemas/LoginSchema";
import UserDTO from "../dto/UserDTO.dto";
import { sendOTP } from "../utils/sendOTP";
import { generateOTP } from "../utils/generateOTP";
import OTP from "../models/OTP.model";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = UserSchema.validate(req.body);

  if (error) {
    return next(error);
  }
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ErrorHandler.send(res, 400, "User already exists");
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPass,
      role,
    });
    if (!user) {
      return ErrorHandler.send(res, 400, "An error occured");
    }

    const { accessToken, refreshToken } = await generateToken(user);

    return ResponseHandler.send(
      res,
      201,
      "Account created successfully",
      user,
      { accessToken, refreshToken }
    );
  } catch (error: any) {
    return next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return ErrorHandler.send(res, 404, "User not found");
    }

    const decryptPass = await bcrypt.compare(password, user.password);
    if (!decryptPass) {
      return ErrorHandler.send(res, 401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateToken(user);

    const userDTO = new UserDTO(user);

    return ResponseHandler.send(res, 200, "Login successful", userDTO, {
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    return next(error);
  }
};

export const otpSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phoneNumber, name, role } = req.body;

  try {
    let user = await User.findOne({ phoneNumber });

    if (user) {
      return ErrorHandler.send(
        res,
        400,
        "User with this phone number already exists"
      );
    }

    // Provide default email and password (these should be updated later)
    const defaultEmail = `${phoneNumber}@otp-temp.com`;
    const defaultPassword = "tempPassword123";

    // Ensure role is lowercase to match the Role enum
    const userRole = role.toLowerCase();

    user = await User.create({
      name,
      phoneNumber,
      email: defaultEmail, // Temporary email
      password: defaultPassword, // Temporary password
      role: userRole, // Use lowercase role (seller, buyer)
    });

    const { otp, otpExpires } = generateOTP();

    // Send OTP via Twilio
    await sendOTP(phoneNumber, otp);

    // Save OTP to the database
    await OTP.create({
      otp,
      otpExpires,
      userId: user._id,
    });

    return ResponseHandler.send(
      res,
      201,
      "OTP sent successfully. Complete registration by verifying the OTP."
    );
  } catch (error: any) {
    return next(error);
  }
};

export const otpLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phoneNumber, otp } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return ErrorHandler.send(res, 404, "User not found");
    }

    const otpRecord = await OTP.findOne({ userId: user._id });
    if (
      !otpRecord ||
      otpRecord.otp !== otp ||
      otpRecord.otpExpires < new Date()
    ) {
      return ErrorHandler.send(res, 401, "Invalid or expired OTP");
    }

    // OTP is valid, delete the OTP record
    await OTP.deleteOne({ userId: user._id });

    // Now generate tokens or complete the login process
    const { accessToken, refreshToken } = await generateToken(user);

    return ResponseHandler.send(res, 200, "Login successful", user, {
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    return next(error);
  }
};
