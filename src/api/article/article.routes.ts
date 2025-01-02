import { Router } from "express";
import * as articleController from "./article.controller";
import { Auth } from "../../middleware/Auth";
import { Authorize } from "../../middleware/Authorize";
import {
  articleParamsSchema,
  createArticleSchema,
  updateArticleSchema,
} from "./article.schemas";
import { ValidateRequest } from "../../middleware/ValidateRequest";

const router = Router();

router.get("/", articleController.find);
router.get(
  "/:id",
  ValidateRequest(articleParamsSchema),
  articleController.findOne
);
router.post(
  "/",
  [Auth, Authorize(["WRITER"]), ValidateRequest(createArticleSchema)],
  articleController.create
);
router.put(
  "/:id",
  [Auth, Authorize(["WRITER"]), ValidateRequest(updateArticleSchema)], // ValidateRequest({params: updateArticleSchema["params"], body:updateArticleSchema["body"] })
  articleController.update
);
router.delete(
  "/:id",
  [Auth, Authorize(["WRITER"]), ValidateRequest(articleParamsSchema)],
  articleController.del
);

export default router;
