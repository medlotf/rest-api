import jwt from "jsonwebtoken";

export const generateToken = async (userId: number) =>
  jwt.sign(
    { id: userId },
    env.JWT_SECRET, //env.JWT_SECRET
    { expiresIn: "24h" }
  );
