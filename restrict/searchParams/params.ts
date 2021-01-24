interface Params {
  keys: string[];
  values: string[];
  query: {
    [key: string]: string;
  };
}

export const params = (searchParams: URLSearchParams): Params => {
  const keys = searchParams.keys();
  const values = searchParams.values();
  const params: Params = {
    keys: [],
    values: [],
    query: {},
  };

  let keyIndex = keys.next();
  let valueIndex = values.next();

  while (!keyIndex.done) {
    params.keys.push(keyIndex.value);
    keyIndex = keys.next();
  }

  while (!valueIndex.done) {
    params.values.push(valueIndex.value);
    valueIndex = values.next();
  }

  params.keys.map((key, i) => (params.query[key] = params.values[i]));

  return params;
};
