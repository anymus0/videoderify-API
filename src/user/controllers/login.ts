import "dotenv/config";
import { Request, Response } from "express";
import { userModel } from "../schemas/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    // check for JWT_SECRET env variable
    if (process.env.JWT_SECRET === undefined || process.env.JWT_SECRET === null)
    throw "Server error! Missing JWT secret!";
    // input process
    if (!req.body.userName || !req.body.userPassword) throw "Missing variables!";
    const userName: string = req.body.userName;
    const userPasswordInput: string = req.body.userPassword;
    // convert recieved SHA256 to upper-case as bcrypt is case sensitive
    const userPassword: string = userPasswordInput.toUpperCase();

    // query user from DB
    const user = await userModel.findOne({ userName: userName }).exec();
    if (user === undefined || user === null)
      throw "User was not found in the DB!";

    // compare password hashes
    const passwordMatches = await bcrypt.compare(userPassword, user.passwordHash);
    if (!passwordMatches) throw "Wrong password!";

    // on successful authentication, create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10800s",
    });

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    res.cookie("JWT_TOKEN", token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: expireDate,
    });

    res.status(200).json({
      status: {
        success: true,
        message: "Successful login!",
        details: null,
      },
      result: null,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        status: {
          success: false,
          message: "Something went wrong!",
          details: err,
        },
        result: null,
      })
      .end();
    return false;
  }
};
