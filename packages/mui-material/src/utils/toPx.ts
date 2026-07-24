// Append `px` to a unitless number; pass through strings (already-unit'd values, CSS vars, calc()).
export default function toPx(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value;
}
