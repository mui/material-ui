/** Use it instead of .includes method for IE support */
export function arrayIncludes<T>(array: T[], itemOrItems: T | T[]) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(item => array.indexOf(item) !== -1);
  }

  return array.indexOf(itemOrItems) !== -1;
}

export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
