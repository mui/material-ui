function clamp(
  val: number,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER,
): number {
  if (val == null) {
    return min;
  }

  return Math.max(min, Math.min(val, max));
}

export default clamp;
