import { NextFunction, Response } from "express";
import { ErrorMessage } from "../../server/types";

export const banParams = (
  keys: string[],
  res: Response,
  next: NextFunction
) => {
  if (keys.length > 0) {
    const err: ErrorMessage = {
      name: "Error",
      code: "ERR_FORBIDDEN",
      message: "Search parameters are not allowed!",
      status: 403,
    };

    res.status(403);
    next(err);
  } else {
    next();
  }
};
