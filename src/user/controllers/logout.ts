import { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  try {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    res.cookie("JWT_TOKEN", "", {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: expireDate,
    });
    res.status(200).json({
      status: {
        success: true,
        message: "Logout was successful!",
        details: null,
      },
      result: null,
    });
  } catch (error) {
    res.status(500).json({
      status: {
        success: false,
        message: "Logout failed!",
        details: error,
      },
      result: null,
    });
  }
};
