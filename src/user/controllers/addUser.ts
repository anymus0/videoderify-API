import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { userModel } from "./../schemas/User.js";
import { User } from "../models/User.js";
import { getUserInfo } from "../../global/getUserInfo.js";

export const addUser = async (req: Request, res: Response) => {
  try {
    // process inputs
    if (
      !req.body.userName ||
      req.body.isAdmin === undefined ||
      req.body.isAdmin === null ||
      !req.body.userPassword ||
      !req.body.userPasswordConfirm
    )
      throw "Necessary variable is missing!";
    const userName: string = req.body.userName;
    const isAdmin: boolean = req.body.isAdmin;
    const userPassword: string = req.body.userPassword;
    const userPasswordConfirm = req.body.userPasswordConfirm;

    // confirm password check
    if (userPassword !== userPasswordConfirm) throw "Passwords don't match!";

    // check if user already exists
    const userDuplicate = await userModel
      .findOne({ userName: userName })
      .exec();
    if (userDuplicate) throw "User already exists!";

    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      userName: userName,
      isAdmin: isAdmin,
      creationDate: new Date(),
      passwordHash: await bcrypt.hash(userPassword.toUpperCase(), 10),
    };

    const newUser = new userModel(user);
    await newUser.save();

    res.status(200).json({
      status: {
        success: true,
        message: "User was created!",
        details: null,
      },
      result: getUserInfo(newUser),
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
