import { NextFunction } from "express";
import { ErrorMessage } from "../../server/types";

export const filterParams = (
  keys: string[],
  args: string[],
  next: NextFunction
) => {
  const filteredParams = keys.filter((param) => args.includes(param));

  if (filteredParams.length > 0) {
    const err: ErrorMessage = {
      name: "Error",
      code: "ERR_FORBIDDEN",
      message: "Search parameters includes invalid arguments!",
      status: 403,
    };

    next({ ...err, invalid: filteredParams });
  } else {
    next();
  }
};
