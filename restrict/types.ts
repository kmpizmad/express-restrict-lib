interface BaseOptions {
  args: string[];
}

export interface FieldOptions extends BaseOptions {
  overrideDefault?: boolean;
}

export interface SearchParamOptions extends BaseOptions {
  regexp?: {
    [key: string]: RegExp;
  };
}

export interface RestrictOptions {
  methods: string;
  fields?: FieldOptions;
  searchParams?: SearchParamOptions;
}
