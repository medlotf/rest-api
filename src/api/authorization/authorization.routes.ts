import { Router } from "express";

import {
  requestWriterRole,
  viewRoleRequests,
  updateRoleRequest,
} from "./authorization.controller";
import { Auth } from "../../middleware/Auth";
import { Authorize } from "../../middleware/Authorize";

const router = Router();

router.post("/request-writer", Auth, requestWriterRole);
router.get("/role-requests", [Auth, Authorize(["ADMIN"])], viewRoleRequests);
router.post(
  "/role-requests/:id",
  [Auth, Authorize(["ADMIN"])],
  updateRoleRequest
);

export default router;
