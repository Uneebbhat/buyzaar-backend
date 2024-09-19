import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config/constants";

interface User {
  _id: string | any;
  name: string;
  email: string;
}

const generateToken = async (user: User) => {
  const accessToken = jwt.sign(
    { userId: user._id, name: user.name, email: user.email },
    ACCESS_TOKEN as string,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { userId: user._id, name: user.name, email: user.email },
    REFRESH_TOKEN as string,
    {
      expiresIn: "30d",
    }
  );

  return { accessToken, refreshToken };
};

export default generateToken;
