import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { type NextFunction, type Request, type Response } from "express";
import User from "../../database/models/User.js";
import { type UserCredentials } from "../types.js";
import { CustomError } from "../../CustomError.js";
import { type CustomJwtPayload } from "./types.js";

const hashingPasswordLength = 10;

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;

  const userToFind = username.toString();

  try {
    const user = await User.findOne({ username: userToFind }).exec();

    if (!user) {
      const error = new CustomError(
        "Wrong credentials",
        401,
        "Wrong credentials"
      );

      next(error);

      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(
        "Wrong credentials",
        401,
        "Wrong credentials"
      );

      next(error);

      return;
    }

    const jwtPayload: CustomJwtPayload = {
      sub: user?._id.toString(),
      username: user.username,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
