export function cleanObject(input) {
  const result = {};

  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const {
        contents,
        mode,
        stats,
        next,
        previous,
        excerpt,
        abstract,
        ...rest
      } = input[key];
      result[key] = rest;
    }
  }

  return result;
}
