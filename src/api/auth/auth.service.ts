import bcrypt from "bcrypt";
import db from "./../../db";
import { generateToken } from "./../../utils/generateToken";

export const RegisterUser = async (
  email: string,
  username: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10); // env.SALT_ROUNDS
  const user = await db.user.create({
    data: { email, username, password: hashedPassword },
  });
  return generateToken(user.id);
};

export const LoginUser = async (email: string, password: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user || !(await bcrypt.compare(password, user.password!)))
    throw new Error("Invalid Credentials");
  return generateToken(user.id);
};
