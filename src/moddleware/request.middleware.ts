import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

export const requestIdMiddlware: RequestHandler = (_req, res, next) => {
  const requestId = randomUUID();

  res.locals.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);

  next();
};

export const requestLogger: RequestHandler = (req, res,next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - startTime;

    console.log({
      requestId: res.locals.requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs,
    })
  })
  next()
}