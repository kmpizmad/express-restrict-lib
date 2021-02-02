export interface BaseOptions {
  methods: string;
  arguments?: string[];
}

export interface FieldOptions extends BaseOptions {
  overrideDefault?: boolean;
}

export interface SearchParamOptions extends BaseOptions {
  regexp?: {
    [key: string]: RegExp;
  };
  regexpStrict?: {
    [key: string]: RegExp;
  };
}

export interface HeaderOptions extends BaseOptions {}

export interface CookieOptions extends BaseOptions {}

export interface RestrictOptions {
  fields?: FieldOptions;
  searchParams?: SearchParamOptions;
  headers?: HeaderOptions;
  cookies?: CookieOptions;
}
