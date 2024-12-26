import { Router } from "express";
import * as articleController from "./article.controller";
import { Auth } from "../../middleware/Auth";

const router = Router();

router.get("/", articleController.find);
router.get("/:id", articleController.findOne);
router.post("/", Auth, articleController.create);
router.put("/:id", Auth, articleController.update);
router.delete("/:id", Auth, articleController.del);

export default router;
