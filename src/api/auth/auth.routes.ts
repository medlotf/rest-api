import { Router } from "express";
import * as authController from "./auth.controller";
import { registerSchema, loginSchema } from "./auth.schemas";
import { ValidateRequest } from "../../middleware/ValidateRequest";

const router = Router();

router.post(
  "/register",
  ValidateRequest(registerSchema),
  authController.register
);
router.post("/login", ValidateRequest(loginSchema), authController.login);

export default router;
