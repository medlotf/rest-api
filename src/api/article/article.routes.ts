import { Router } from "express";
import * as articleController from "./article.controller";

const router = Router();

router.get("/", articleController.find);
router.get("/:id", articleController.findOne);
router.post("/", articleController.create);
router.put("/:id", articleController.update);
router.delete("/:id", articleController.del);

export default router;
