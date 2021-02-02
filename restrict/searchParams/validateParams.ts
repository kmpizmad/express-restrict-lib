import { NextFunction, Response } from "express";
import { ErrorMessage } from "../../server/types";
import _ from "lodash";

export const validateParams = (
  query: { [key: string]: string },
  pattern: { [key: string]: RegExp },
  res: Response,
  next: NextFunction,
  strict?: boolean
) => {
  const queryProps = Object.getOwnPropertyNames(query);
  const patternProps = Object.getOwnPropertyNames(pattern);

  if (strict && !_.isEqual(queryProps, patternProps)) {
    const err: ErrorMessage = {
      name: "Error",
      code: "ERR_NO_MATCH",
      message:
        "Invalid search params! Given params doesn't match with the required params",
      status: 400,
    };

    res.status(400);
    next({ ...err, given: queryProps, required: patternProps });
  } else {
    const filteredParams = Object.getOwnPropertyNames(query).filter(
      (param) => !pattern[param].test(query[param])
    );

    if (filteredParams.length > 0) {
      const err: ErrorMessage = {
        name: "Error",
        code: "ERR_INVALID_PATTERN",
        message:
          "Invalid search params! Please check if the pattern of your input matches the requirements.",
        status: 400,
      };

      res.status(400);
      next({ ...err, invalid: filteredParams });
    } else {
      res.status(200);
      next();
    }
  }
};
