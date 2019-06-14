/** Use it instead of .includes method for IE support */
export function arrayIncludes<T>(array: T[], item: T) {
  return array.indexOf(item) !== -1;
}
