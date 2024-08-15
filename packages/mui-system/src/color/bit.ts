// Bitwise functions
//
// The color representation uses 32-bits unsigned, but JS bitwise operators consider a
// 32-bits signed representation, which means the return value will be a negative number
// if the most significant bit is set. The MSB is always in the red channel, as the
// representation is 0xRRGGBBAA
//
// To offset that issue, we cast bitwise operation results when we know we're going to run
// into it. The MSB in signed representation is -2**31, and 2**31 when unsigned. Casting from
// a negative number to the correct value is as simple as adding `2 * 2**31`.
//
// We use both safe & unsafe variants for performance reasons, for example getting the G, B or
// A channels is always safe with native operators as the first operation will always mask the
// MSB.

const INT32_TO_UINT32_OFFSET = 2 * (2 ** 31)

export function cast(n: number) {
  if (n < 0) {
    return n + INT32_TO_UINT32_OFFSET;
  }
  return n;
}

export function getUnsafe(n: number, offset: number) {
  return (n & (0xff << offset)) >> offset
}

export function get(n: number, offset: number) {
  return cast(
    cast(
      n & cast(0xff << offset)
    ) >> offset
  )
}

export function setUnsafe(n: number, offset: number, byte: number) {
  return n ^ ((n ^ (byte << offset)) & (0xff << offset)); 
}

export function set(n: number, offset: number, byte: number) {
  return cast(n ^
    cast(
      cast(n ^ cast(byte << offset)) &
      cast(0xff << offset)
    )
  ); 
}

