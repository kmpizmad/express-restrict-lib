import { Request } from "express";
import { Controller } from "../server/types";
import { URL } from "url";
import { FieldOptions, RestrictOptions, SearchParamOptions } from "./types";
import {
  banParams,
  filterParams,
  params,
  validateParams,
} from "./searchParams";
import { applyFieldOptions, applySearchParamOptions } from "./apply";

class Restrict {
  private __fields: FieldOptions;
  private __searchParams: SearchParamOptions;
  private __methods: string[] = [];

  constructor(options?: RestrictOptions) {
    console.log(this.__fields);

    if (options) {
      this.__applyOptions(options);
    } else {
      this.__methods.push("all");
    }
  }

  /**
   * @public
   * @description Restricts given fields from requesting
   * @param args Blacklisted fields
   */
  public fields(...args: string[]): Controller {
    const _fields: Controller = (req, res, next) => {
      if (this.__isMethodAllowed(req)) {
      } else {
        next();
      }

      console.log(res, args);
    };

    return _fields;
  }

  /**
   * @public
   * @description Restricts given headers from requesting
   * @param args Blacklisted headers
   */
  public headers(...args: string[]): Controller {
    const _headers: Controller = (req, res, next) => {
      if (this.__isMethodAllowed(req)) {
      } else {
        next();
      }

      console.log(res, args);
    };

    return _headers;
  }

  /**
   * @public
   * @description Restricts or validates given search parameters.
   * @param args Blacklisted query parameters. Bans every query parameter if none provided.
   */
  public searchParams(...args: string[]): Controller {
    const _searchParams: Controller = (req, res, next) => {
      if (this.__isMethodAllowed(req)) {
        const baseUrl = req.protocol + "://" + req.get("host");
        const { searchParams } = new URL(req.url, baseUrl);
        const { keys, query } = params(searchParams);

        const regexp = this.__searchParams
          ? this.__searchParams.regexp
          : undefined;
        const sArgs = this.__searchParams
          ? this.__searchParams.args
          : undefined;

        if ((!sArgs || sArgs.length === 0) && args.length === 0) {
          banParams(keys, res, next);
        } else {
          if (regexp) {
            validateParams(regexp, query, next);
          } else {
            filterParams(keys, sArgs || args, next);
          }
        }
      } else {
        next();
      }
    };

    return _searchParams;
  }

  /**
   * @private
   * @description Applies the options
   * @param options Configuration for the middleware
   */
  private __applyOptions(options: RestrictOptions): void {
    this.__methods = options.methods
      .split(",")
      .map((method) => method.toLowerCase());

    const { fields, searchParams } = options;

    if (fields) {
      this.__fields = fields;
      applyFieldOptions(fields);
    }

    if (searchParams) {
      this.__searchParams = searchParams;
      applySearchParamOptions(searchParams);
    }
  }

  /**
   * @private
   * @description Checks if the configuration allows the used method
   * @param req The request object
   */
  private __isMethodAllowed(req: Request): boolean {
    return (
      this.__methods.includes("all") ||
      this.__methods.includes(req.method.toLowerCase())
    );
  }
}

const restrict = (options?: RestrictOptions): Restrict => new Restrict(options);

export default restrict;
