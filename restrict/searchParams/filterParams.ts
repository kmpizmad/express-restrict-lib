import { NextFunction, Response } from "express";
import { ErrorMessage } from "../../server/types";

export const filterParams = (
  keys: string[],
  args: string[],
  res: Response,
  next: NextFunction
) => {
  const filteredParams = keys.filter((param) => args.includes(param));

  if (filteredParams.length > 0) {
    const err: ErrorMessage = {
      name: "Error",
      code: "ERR_INVALID_ARGUMENT",
      message: "Search parameters includes invalid arguments!",
      status: 400,
    };

    res.status(400);
    next({ ...err, invalid: filteredParams });
  } else {
    next();
  }
};
