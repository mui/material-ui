type ItemComparer<T> = (a: T, b: T) => boolean;

export default function areArraysEqual<T>(
  array1: T[],
  array2: T[],
  itemComparer: ItemComparer<T> = (a, b) => a === b,
) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => itemComparer(value, array2[index]))
  );
}
