import { NextFunction, Request, Response } from "express";

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type ErrorController = Controller extends (...params: infer U) => infer R
  ? (err: Error, ...params: U) => R
  : never;

export interface ErrorMessage extends Error {
  name: string;
  code: string;
  message: string;
  status: number;
}
