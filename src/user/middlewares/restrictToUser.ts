import { Request, Response, NextFunction } from "express";

export const restrictToUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // change 'isAdmin' to false
    req.body.isAdmin = false;
    next();
    return true;
  } catch (error) {
    res
    .status(500)
    .json({
      status: {
        success: false,
        message: "Something went wrong in user restriction!",
        details: error,
      },
      result: null,
    })
    .end();
    return false;
  }
}
