import { Router } from "express";

import article from "./article/article.routes";

const router = Router();

router.use("/articles", article);

export default router;
