import { Controller, ErrorController, ErrorMessage } from "../types";
import { getProperty } from "../utils/request";

export const notFound: Controller = (req, _res, next) => {
  const missing = getProperty(req, "missing") || req.originalUrl;

  const err: ErrorMessage = {
    name: "Error",
    code: "ERR_NOT_FOUND",
    message: "Not found " + missing,
    status: 404,
  };

  next(err);
};

export const error: ErrorController = (err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json(err);
};
