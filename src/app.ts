import express from "express";
import type { ErrorRequestHandler } from "express";
import healthRouter from "./modules/health/health.routes.js";
import {
  requestIdMiddlware,
  requestLogger,
} from "./moddleware/request.middleware.js";

const app = express();

// Hide the Express technology header.
app.disable("x-powered-by");

//Identify every request
app.use(requestIdMiddlware);

//Log request results
app.use(requestLogger);

// Parse incoming JSON request bodies.
app.use(express.json({ limit: "1mb" }));

//Register application routes.
app.use("/api/v1/health", healthRouter);

// Handle unknown routes.
app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: "ROUTE_NOT_FOUND",
      message: "The requested route does not exist.",
    },
  });
});

//centralized error handler - must be last
const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  //Invalid JSON submitted by the client
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({
      error: {
        code: "InvalidA_JSON",
        message: "Request body contaions invalid JSON",
      },
    });
  }
  return;

  //Log internal details on the server, not in the response

  console.error({
    requestId: res.locals.requestId,
    error: err instanceof Error ? err.message : "Unlnown error",
  });

  res.status(500).json({
    error: {
      code: "InTERNAL_SERVER_ERROR",
      message: "An unexpected error occured",
      requestId: res.locals.requestId,
    },
  });
};

app.use(errorHandler);

export default app;
