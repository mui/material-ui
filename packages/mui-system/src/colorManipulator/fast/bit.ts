// Bitwise functions
//
// The color representation would ideally be 32-bits unsigned, but JS bitwise
// operators only work as 32-bits signed. The range of Smi values on V8 is also
// 32-bits signed. Those two factors make it that it's much more efficient to just
// use signed integers to represent the data.
//
// Colors with a R channel >= 0x80 will be a negative number, but that's not really
// an issue at any point because the bits for signed and unsigned integers are always
// the same, only their interpretation changes.

/* eslint-disable no-bitwise */

export function get(n: number, offset: number) {
  return (n >> offset) & 0xff;
}

export function set(n: number, offset: number, byte: number) {
  return n ^ ((n ^ (byte << offset)) & (0xff << offset));
}
