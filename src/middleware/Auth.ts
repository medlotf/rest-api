import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "./../db";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (typeof decoded !== "string" && "id" in decoded) {
      const user = await db.user.findUnique({
        where: { id: (decoded as JwtPayload).id },
      });
      res.locals.user = user;
      next();
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
