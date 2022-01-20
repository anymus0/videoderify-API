import { Request, Response } from "express";
import { userModel } from "./../schemas/User.js";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId: string = req.body.userId;
    if (!userId) throw "Missing userId input!";

    const user = await userModel.findById(userId).exec();
    if (user === undefined || user === null) throw "User was not found!";

    const userWithoutPasswordHash = {
      _id: user._id,
      userName: user.userName,
      isAdmin: user.isAdmin,
      creationDate: user.creationDate
    }

    res.status(500).json({
      status: {
        success: true,
        message: "User was found!",
        details: null,
      },
      result: userWithoutPasswordHash,
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
