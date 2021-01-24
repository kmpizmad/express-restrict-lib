import { NextFunction } from "express";
import { ErrorMessage } from "../../server/types";

export const validateParams = (
  pattern: { [key: string]: RegExp },
  query: { [key: string]: string },
  next: NextFunction
) => {
  const filteredParams = Object.getOwnPropertyNames(query).filter(
    (param) => !pattern[param].test(query[param])
  );

  if (filteredParams.length > 0) {
    const err: ErrorMessage = {
      name: "Error",
      code: "ERR_FORBIDDEN",
      message:
        "Invalid search params! Please check if the pattern of your input matches the requirements.",
      status: 403,
    };

    next({ ...err, invalid: filteredParams });
  } else {
    next();
  }
};
