import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const result = await authServices.loginUserIntoDB(email, password);

    return res.status(201).json({
      success: true,
      message: "User Login Successfull",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const authController = {
    loginUser
}