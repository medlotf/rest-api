import db from "./../db";
import { Request, Response, NextFunction } from "express";

export const Authorize = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user;
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
