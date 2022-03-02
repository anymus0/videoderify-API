import "dotenv/config";
import { Request, Response, NextFunction } from "express";

export const authenticateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check keys
    const apiKeyInput = req.headers.api_key;
    const API_KEY = process.env.API_KEY;
    if (apiKeyInput !== API_KEY) throw "Wrong API_KEY!";
    // simulate user
    req.body.jwtUserId = "1l3f32ba2c6bc7c5b63a2de1";
    next();
    return true;
  } catch (error) {
    res
      .status(401)
      .json({
        status: {
          success: false,
          message: "Could not authenticate the API key!",
          details: error,
        },
        result: null,
      })
      .end();
    return false;
  }
};
