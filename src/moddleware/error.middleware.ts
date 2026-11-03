import type { ErrorRequestHandler } from "express";
import { ApiError } from "../shared/errors/api.error.js";

export const errorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  next,
) => {

  if (res.headersSent) {
    next(err);
    return 
  }

  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({
      error: {
        code: "INVALID_JSON",
        message:"Request Body Contains invalid JSON"
      }
    })
    return;
  }
  console.error("unexpected error:", err);

  res.status(500).json(
    {
      error: {
        code: "INTERNAL SERVER ERROR",
        message:"An unexpected error occured."
      }
    }
  )
  
};
