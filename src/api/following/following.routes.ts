import { Router } from "express";

import * as followingController from "./following.controller";
import { Auth } from "../../middleware/Auth";
import { ValidateRequest } from "../../middleware/ValidateRequest";
import { followUserSchema, followingFeedSchema } from "./following.schemas";

const router = Router();

// Get articles from users the logged-in user is following
router.get(
  "/feed",
  [Auth, ValidateRequest(followingFeedSchema)],
  followingController.find
);

// Get the list of users that the logged-in user is following and or followed by
router.get("/users", Auth, followingController.findUsers);

// Follow a user by their user ID
router.post(
  "/:userId/follow",
  [Auth, ValidateRequest(followUserSchema)],
  followingController.follow
);

// Unfollow a user by their user ID
router.delete(
  "/:userId/unfollow",
  [Auth, ValidateRequest(followUserSchema)],
  followingController.unfollow
);

export default router;
