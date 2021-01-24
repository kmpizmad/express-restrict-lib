import { FieldOptions, SearchParamOptions } from "./types";

export const applyFieldOptions = (fields: FieldOptions): string[] => {
  let defaultFields = ["id", "createdAt", "updatedAt"];

  if (fields.overrideDefault) {
    defaultFields = fields.args;
  } else {
    defaultFields = [...defaultFields, ...fields.args];
  }

  return defaultFields;
};

export const applySearchParamOptions = (
  _searchParams: SearchParamOptions
) => {};
