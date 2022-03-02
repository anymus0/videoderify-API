import { Request, Response } from "express";
import { userModel } from "./../schemas/User.js";
import { UserInfo } from "./../models/User.js";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    if (!userId) throw "Missing userId input!";

    const user = await userModel.findById(userId).exec();
    if (user === undefined || user === null) throw "User was not found!";

    const userInfo: UserInfo = {
      _id: user._id,
      userName: user.userName,
      isAdmin: user.isAdmin,
      creationDate: user.creationDate,
    };

    res.status(200).json({
      status: {
        success: true,
        message: "User was found!",
        details: null,
      },
      result: userInfo,
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
