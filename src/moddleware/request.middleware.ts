import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";
import { pinoHttp } from "pino-http";
import { logger } from "../config/logger.js";

export const requestIdMiddlware: RequestHandler = (_req, res, next) => {
  const requestId = randomUUID();

  res.locals.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);

  next();
};

export const requestLogger = pinoHttp({
  logger,

  genReqId: (req, res) => {
    return res.getHeader("X-Request-Id")?.toString() ?? randomUUID();
  },
  customProps: (req, res) => ({
    requestId: res.getHeader("X-Request-Id"),
  }),
});
