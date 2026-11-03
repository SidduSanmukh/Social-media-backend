import type { Request, Response, NextFunction, RequestHandler } from "express";

type AsynController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

export const AsynHandler = (controller: AsynController): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
};
