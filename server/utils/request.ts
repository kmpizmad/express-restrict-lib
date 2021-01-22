export const getProperty = (o: any, p: string): any => o[p];
export const setProperty = (o: any, p: string, value: any): void =>
  (o[p] = value);
