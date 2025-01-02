import { Request, Response } from "express";
import { RegisterUser, LoginUser } from "./auth.service";
import { LoginUserInput, RegisterUserInput } from "./auth.schemas";

export const register = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  const { email, username, password } = req.body;
  try {
    const token = await RegisterUser(email, username, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: `Registration failed ${error.message}` });
  }
};

export const login = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const token = await LoginUser(email, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: `Login failed ${error.message}` });
  }
};
