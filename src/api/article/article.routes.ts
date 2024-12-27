import { Router } from "express";
import * as articleController from "./article.controller";
import { Auth } from "../../middleware/Auth";
import { Authorize } from "../../middleware/Authorize";

const router = Router();

router.get("/", articleController.find);
router.get("/:id", articleController.findOne);
router.post("/", [Auth, Authorize["WRITER"]], articleController.create);
router.put("/:id", [Auth, Authorize["WRITER"]], articleController.update);
router.delete("/:id", [Auth, Authorize["WRITER"]], articleController.del);

export default router;
