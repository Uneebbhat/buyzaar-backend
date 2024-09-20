import { NextFunction, Request, Response } from "express";
import ResponseHandler from "../utils/ResponseHandler";
import UserSchema from "../schemas/UserSchema";
import ErrorHandler from "../utils/ErrorHandler";
import User from "../models/User.model";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";
import LoginSchema from "../schemas/LoginSchema";
import UserDTO from "../dto/UserDTO.dto";
import { DEFAULT_IMAGE } from "../config/constants";
import cloudinaryUpload from "../utils/cloudinaryUpload";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = UserSchema.validate(req.body);

  if (error) {
    return next(error);
  }
  const { name, email, password, role, phoneNumber } = req.body;

  try {
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return ErrorHandler.send(res, 400, "User already exists with this email");
    }

    const existingUserByPhone = await User.findOne({ phoneNumber });
    if (phoneNumber && existingUserByPhone) {
      return ErrorHandler.send(
        res,
        400,
        "User already exists with this phone number"
      );
    }

    const hashPass = await bcrypt.hash(password, 10);
    let profilePicUrl = DEFAULT_IMAGE;

    if (req.file) {
      try {
        const profilePic = await cloudinaryUpload(req.file.path, {
          folder: "buynex/profile_pic",
        });
        profilePicUrl = profilePic.secure_url;
      } catch (error: any) {
        return ErrorHandler.send(res, 500, error.message);
      }
    }

    const user = await User.create({
      profilePic: profilePicUrl,
      name,
      email,
      password: hashPass,
      role,
      phoneNumber,
    });

    if (!user) {
      return ErrorHandler.send(
        res,
        400,
        "An error occurred while creating the account"
      );
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
