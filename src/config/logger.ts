import pino from "pino";
import { env } from "./env.js";
import { transformer } from "zod/v3";

export const logger = pino({
  level: env.NODE_ENV === "development" ? "debug" : "info",

  transport:
    env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
          },
        }
      : undefined,

  redact: {
    paths: [
      "password",
      "req.headers.authorization",
      "req.headers.cookie",
      "*.password",
    ],
    censor: "[REDACTED]",
  },
});
