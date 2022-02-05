import { Request, Response } from "express";
import { userModel } from "./../schemas/User.js";

export const getAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const jwtUserId: string = req.body.jwtUserId;
    if (!jwtUserId) throw "Missing userId from JWT auth!";

    const user = await userModel.findById(jwtUserId).exec();
    if (user === undefined || user === null) throw "User was not found!";

    const userWithoutPasswordHash = {
      _id: user._id,
      userName: user.userName,
      isAdmin: user.isAdmin,
      creationDate: user.creationDate
    }

    res.status(200).json({
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
