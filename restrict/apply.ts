import { FieldOptions, SearchParamOptions } from "./types";

export const applyFieldOptions = (fields: FieldOptions): string[] => {
  let defaultFields = ["id", "createdAt", "updatedAt"];

  if (fields.arguments) {
    if (fields.overrideDefault) {
      defaultFields = fields.arguments;
    } else {
      defaultFields = [...defaultFields, ...fields.arguments];
    }
  }

  return defaultFields;
};

export const applySearchParamOptions = (
  _searchParams: SearchParamOptions
) => {};
