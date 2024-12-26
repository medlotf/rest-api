import { Router } from "express";

import article from "./article/article.routes";
import auth from "./auth/auth.routes";

const router = Router();

router.use("/auth", auth);
router.use("/articles", article);

export default router;
