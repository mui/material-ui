import { clamp } from '@mui/utils';

export function clampStepwise(
  val: number,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER,
  stepProp: number = NaN,
): number {
  if (Number.isNaN(stepProp)) {
    return clamp(val, min, max);
  }

  const step = stepProp || 1;

  const remainder = val % step;

  const positivity = Math.sign(remainder);

  if (Math.abs(remainder) > step / 2) {
    return clamp(val + positivity * (step - Math.abs(remainder)), min, max);
  }

  return clamp(val - positivity * Math.abs(remainder), min, max);
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);
}
