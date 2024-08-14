// Bitwise functions
//
// The color representation uses 32-bits unsigned, but JS bitwise operators consider a
// 32-bits signed representation, which means we lose 1 bit if we use native operators.
// We still want to use them when it's safe to do so to get better performance, so we have
// safe/unsafe variants for each function.
// The safe variants perform the same bitwise operations as their counterpart, but using
// standard number operators.

const BYTE_OFFSET = 2 ** 8;
const MAX_SAFE_INTEGER = (2 ** 32) - 1

export function get(n: number, offset: number) {
  if (n <= MAX_SAFE_INTEGER && offset < 24) {
    return getUnsafe(n, offset)
  }
  const offsetFactor = 2 ** offset
  const high = n - (n % offsetFactor);
  const isolate = high % (offsetFactor * BYTE_OFFSET)
  return isolate / offsetFactor
}

export function getUnsafe(n: number, offset: number) {
  return (n & (0xff << offset)) >> offset
}

export function set(n: number, offset: number, byte: number) {
  if (n <= MAX_SAFE_INTEGER && offset < 24) {
    return setUnsafe(n, offset, byte)
  }
  const offsetFactor = 2 ** offset
  const high = n - (n % offsetFactor);
  const isolate = high % (offsetFactor * BYTE_OFFSET)
  return n - isolate + (byte * offsetFactor)
}

function setUnsafe(n: number, offset: number, byte: number) {
  return n ^ ((n ^ (byte << offset)) & (0xff << offset)); 
}
