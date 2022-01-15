import { Request, Response } from "express";
import { userModel } from "../schemas/User.js";
import md5 from "md5";

export const login = async (req: Request, res: Response) => {
  try {
    // input process
    const userName: string = req.body.userName;
    const userPassword: string = req.body.userPassword;
    if (!userName || !userPassword) throw "Missing variables!";
    const passwordHashFromInput = md5(userPassword);

    // query user from DB
    const user = await userModel.findOne({ userName: userName }).exec();
    if (user === undefined || user === null)
      throw "User was not found in the DB!";

    if (user.passwordHash !== passwordHashFromInput) throw "Wrong password!";
    res.status(200).json({
      status: {
        success: true,
        message: "Successful login!",
        details: null,
      },
      // TODO: result should be a JWT
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
