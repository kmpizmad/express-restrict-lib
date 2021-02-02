import { Request } from "express";
import { Controller } from "../server/types";
import { URL } from "url";
import {
  BaseOptions,
  CookieOptions,
  FieldOptions,
  HeaderOptions,
  RestrictOptions,
  SearchParamOptions,
} from "./types";
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
  private __headers: HeaderOptions;
  private __cookies: CookieOptions;

  constructor(options?: RestrictOptions) {
    if (options) {
      this.__applyOptions(options);
    } else {
    }
  }

  /**
   * @public
   * @description Restricts given fields from requesting
   * @param args Blacklisted fields
   */
  public fields(...args: string[]): Controller {
    const _fields: Controller = (req, res, next) => {
      if (this.__isMethodAllowed(this.__fields, req)) {
      } else {
        next();
      }

      console.log(res, args);
    };

    return _fields;
  }

  /**
   * @public
   * @description Restricts or validates given search parameters.
   * @param args Blacklisted query parameters. Bans every query parameter if none provided.
   */
  public searchParams(...args: string[]): Controller {
    const searchParams_: Controller = (req, res, next) => {
      if (this.__isMethodAllowed(this.__searchParams, req)) {
        const baseUrl = req.protocol + "://" + req.get("host");
        const { searchParams } = new URL(req.url, baseUrl);
        const { keys, query } = params(searchParams);

        const {
          arguments: arguments_,
          regexp,
          regexpStrict,
        } = this.__searchParams;

        if (regexpStrict || regexp) {
          if (regexpStrict) {
            validateParams(query, regexpStrict, res, next, true);
          }
          if (regexp) {
            validateParams(query, regexp, res, next);
          }
        } else if (arguments_ && arguments_.length > 0) {
          filterParams(keys, [...arguments_, ...args], res, next);
        } else {
          banParams(keys, res, next);
        }
      } else {
        next();
      }
    };

    return searchParams_;
  }

  /**
   * @public
   * @description Restricts given headers from requesting
   * @param args Blacklisted headers
   */
  public headers(...args: string[]): Controller {
    const _headers: Controller = (req, res, next) => {
      if (this.__isMethodAllowed(this.__headers, req)) {
      } else {
        next();
      }

      console.log(res, args);
    };

    return _headers;
  }

  /**
   * @public
   * @description Restricts given cookies from requesting
   * @param args Blacklisted cookies
   */
  public cookies(...args: string[]): Controller {
    const _cookies: Controller = (req, res, next) => {
      if (this.__isMethodAllowed(this.__cookies, req)) {
      } else {
        next();
      }

      console.log(res, args);
    };

    return _cookies;
  }

  /**
   * @private
   * @description Applies the options
   * @param options Configuration for the middleware
   */
  private __applyOptions(options: RestrictOptions): void {
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
  private __isMethodAllowed(config: BaseOptions, req: Request): boolean {
    const methods = config.methods
      .split(",")
      .map((method) => method.trim().toLowerCase());

    return methods.includes(req.method.toLowerCase());
  }
}

const restrict = (options?: RestrictOptions): Restrict => new Restrict(options);

export default restrict;
