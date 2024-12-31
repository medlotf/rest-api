import { Router } from "express";

import article from "./article/article.routes";
import auth from "./auth/auth.routes";
import googleAuth from "./auth/googleAuth.routes";

const router = Router();

router.use("/auth", auth);
router.use("/authentication", googleAuth);
router.use("/articles", article);

export default router;
