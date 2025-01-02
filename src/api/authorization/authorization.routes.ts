import { Router } from "express";

import {
  requestWriterRole,
  viewRoleRequests,
  updateRoleRequest,
} from "./authorization.controller";
import { Auth } from "../../middleware/Auth";
import { Authorize } from "../../middleware/Authorize";
import { ValidateRequest } from "../../middleware/ValidateRequest";
import { updateRoleRequestSchema } from "./authorization.schemas";

const router = Router();

router.post("/request-writer", Auth, requestWriterRole);
router.get("/role-requests", [Auth, Authorize(["ADMIN"])], viewRoleRequests);
router.post(
  "/role-requests/:id",
  [Auth, Authorize(["ADMIN"]), ValidateRequest(updateRoleRequestSchema)],
  updateRoleRequest
);

export default router;
