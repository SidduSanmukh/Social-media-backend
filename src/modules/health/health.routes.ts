import { Router } from "express";
import { timeStamp } from "node:console";

const healthRouter = Router();

healthRouter.get("/live", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Social media API is running",
    timeStamp: new Date().toISOString(),
  });
});

healthRouter.get("/ready", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Application is ready",
    dependencies: {
      database: "not_configured_yet",
    },
    timestamp: new Date().toISOString(),
  });
});

export default healthRouter;
