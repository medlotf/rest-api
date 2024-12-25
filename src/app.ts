import express from "express";
import api from "./api";

const app = express();
app.use(express.json());

app.get("/healthcheck", (_req, res) => {
  res.json({ message: "Api is up and running!" });
});

app.use("/", api);

export default app;
