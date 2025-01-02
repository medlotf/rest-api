import { Router } from "express";

import article from "./article/article.routes";
import auth from "./auth/auth.routes";
import googleAuth from "./auth/googleAuth.routes";
import following from "./following/following.routes";

const router = Router();

router.use("/auth", auth);
router.use("/authentication", googleAuth);
router.use("/articles", article);
router.use("/following", following);

export default router;
