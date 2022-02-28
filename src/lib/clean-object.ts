/**
 * Clean up object keys with undefined values
 */
export const cleanObject = <T extends Record<string, unknown>>(
  obj: T
): Partial<T> =>
  Object.keys(obj).reduce<Partial<T>>((carrier, key) => {
    return typeof obj[key] !== 'undefined'
      ? { ...carrier, [key]: obj[key] }
      : carrier;
  }, {});
