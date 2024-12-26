import { Request, Response } from "express";
import { RegisterUser, LoginUser } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const token = await RegisterUser(email, username, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: `Registration failed ${error.message}` });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await LoginUser(email, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: `Login failed ${error.message}` });
  }
};
