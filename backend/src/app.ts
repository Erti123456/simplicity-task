import express from "express";
import cors from "cors";
import { env } from "./lib/env.js";
import { announcementsRouter } from "./routes/announcements.js";

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN }));

app.use(express.json());

app.use("/announcements", announcementsRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export { app };
