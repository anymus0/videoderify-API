import { Request, Response, NextFunction } from "express";
import { userModel } from "./../schemas/User.js";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // query user from DB
    const userId: string = req.body.jwtUserId;
    if (!userId) throw "Missing userId variable!";

    const user = await userModel.findById(userId).exec();
    if (user === undefined || user === null)
      throw "User was not found in the DB!";

    if (user.isAdmin) {
      next();
      return true;
    } else {
      res
        .status(403)
        .json({
          status: {
            success: false,
            message: "Something went wrong!",
            details: "User is not an admin!",
          },
          result: null,
        })
        .end();
        return false;
    }
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
