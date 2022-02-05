import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.headers.authorization;
    if (authToken === undefined || authToken === null)
      throw "Authorization header is missing!";
    if (process.env.JWT_SECRET === undefined || process.env.JWT_SECRET === null)
      throw "Server error! Missing JWT secret!";
    jwt.verify(authToken, process.env.JWT_SECRET, (err, user) => {
      if (err) throw err;
      req.body.user = user;
      next();
    });
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
