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
      code: "ERR_INVALID_ARGUMENT",
      message: "Search parameters are not allowed!",
      status: 400,
    };

    res.status(400);
    next(err);
  } else {
    next();
  }
};
