import express from "express";
import passport from "passport";

import api from "./api";
import "./utils/passport";
import { ErrorHandler } from "./middleware/ErrorHandler";

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.get("/healthcheck", (_req, res) => {
  res.json({ message: "Api is up and running!" });
});

app.use("/", api);
app.use(ErrorHandler);

export default app;
