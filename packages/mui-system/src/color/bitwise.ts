// Bitwise functions
// The color representation uses 32-bits unsigned, but JS bitwise operators consider a
// 32-bits signed representation, which means we lose 1 bit if we use native operators.

const BYTE_OFFSET = 2 ** 8;

export function shl(n: number, offset: number) {
  return n * Math.pow(2, offset);
}

/** Gets the byte at @offset */
export function get(n: number, offset: number) {
  const offsetFactor = 2 ** offset
  const high = n - (n % offsetFactor);
  const isolate = high % (offsetFactor * BYTE_OFFSET)
  return isolate / offsetFactor
}

/** Sets the byte at @offset */
export function set(n: number, offset: number, byte: number) {
  const offsetFactor = 2 ** offset
  const high = n - (n % offsetFactor);
  const isolate = high % (offsetFactor * BYTE_OFFSET)
  return n - isolate + (byte * offsetFactor)
}
