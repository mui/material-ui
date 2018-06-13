export default function clamp(value, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max);
}
