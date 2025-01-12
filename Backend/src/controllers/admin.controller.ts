import adminModel from "../models/admin.model";
import { Request, Response } from "express";
export const registerAdmin = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(411).json({
      success: false,
      message: "all fiels are required",
    });
  }
  try {
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin)
      return res
        .status(403)
        .json({ success: false, message: "existing admin " });

    const Admin = await adminModel.create({
      username,
      password,
      email,
      role: "admin",
    });

    const token = await Admin.getJwtToken();

    return res.status(200).json({
      success: true,
      Admin,
      token,
      message: "admin registerd successfully",
    });
  } catch (error) {
    console.log("error in register admin", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const LoginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(411).json({
      success: false,
      message: "all fields are required",
    });
  }
  try {
    const Admin = await adminModel.findOne({ email });
    if (!Admin)
      return res
        .status(403)
        .json({ success: false, message: "invalid credentials" });

    const isCorrectPassword = Admin.comparePassword(password);

    if (!isCorrectPassword) {
      return res
        .status(411)
        .json({ success: false, message: "invalid password" });
    }
    const token = await Admin.getJwtToken();

    return res.status(200).json({
      success: true,
      Admin,
      token,
      message: "admin logged in successfully",
    });
  } catch (error) {
    console.log("error in login admin", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
