import { Request, Response } from "express";
import mongoose from "mongoose";
import md5 from "md5";
import { userModel } from "./../schemas/User.js";
import { User } from "../models/User.js";

export const addUser = async (req: Request, res: Response) => {
  try {
    // process inputs
    const userName: string = req.body.userName;
    const isAdmin: boolean = req.body.isAdmin;
    const password: string = req.body.password;
    if (!userName || !isAdmin || !password)
      throw "Necessary variable is missing!";

    // check if user already exists
    const userDuplicate = await userModel.findOne({ userName: userName }).exec();
    if (userDuplicate) throw "User already exists!";

    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      userName: userName,
      isAdmin: isAdmin,
      creationDate: new Date(),
      passwordHash: md5(password),
    };

    const newUser = new userModel(user);
    await newUser.save();

    res.status(200).json({
      status: {
        success: true,
        message: "User was created!",
        details: null,
      },
      result: newUser.userName,
    });
  } catch (err) {
    res.status(500).json({
      status: {
        success: false,
        message: "Something went wrong!",
        details: err,
      },
      result: null,
    });
  }
};
