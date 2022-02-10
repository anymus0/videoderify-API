import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {    
    const authToken: string = req.cookies.JWT_TOKEN;
    if (authToken === undefined || authToken === null)
      throw "Authorization cookie is missing!";
    if (process.env.JWT_SECRET === undefined || process.env.JWT_SECRET === null)
      throw "Server error! Missing JWT secret!";

    const token = jwt.verify(authToken, process.env.JWT_SECRET);
    if (token === undefined || token === null || typeof token === "string")
      throw "Server Error! JWT payload was not found!";
    const userId: string = token["userId"];
    req.body.jwtUserId = userId;
    next();
  } catch (error) {
    res
      .status(401)
      .json({
        status: {
          success: false,
          message: "Could not authenticate!",
          details: error,
        },
        result: null,
      })
      .end();
    return false;
  }
};
