function simpleClamp(
  val: number,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER,
): number {
  return Math.max(min, Math.min(val, max));
}

export function clamp(
  val: number,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER,
  stepProp: number = NaN,
): number {
  if (Number.isNaN(stepProp)) {
    return simpleClamp(val, min, max);
  }

  const step = stepProp || 1;

  const remainder = val % step;

  const positivity = Math.sign(remainder);

  if (Math.abs(remainder) > step / 2) {
    return simpleClamp(val + positivity * (step - Math.abs(remainder)), min, max);
  }

  return simpleClamp(val - positivity * Math.abs(remainder), min, max);
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);
}
