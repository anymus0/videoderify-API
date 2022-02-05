import { Request, Response } from "express";
import { userModel } from "./../schemas/User.js";

export const getAllUsers = async (req: Request, res: Response) => {
  try {

    const users = await userModel.find({}).exec();
    if (users === undefined || users === null || users.length <= 0) throw "No user was found!";

    res.status(200).json({
      status: {
        success: true,
        message: "Users were found!",
        details: null,
      },
      result: users,
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
