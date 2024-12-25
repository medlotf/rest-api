import express from "express";

const app = express();
app.use(express.json());

app.get("/healthcheck", (_req, res) => {
  res.json({ message: "Api is up and running!" });
});

export default app;
