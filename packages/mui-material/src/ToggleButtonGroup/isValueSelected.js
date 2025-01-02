// Determine if the toggle button value matches, or is contained in, the
// candidate group value.
export default function isValueSelected(value, candidate) {
  if (candidate === undefined || value === undefined) {
    return false;
  }

  if (Array.isArray(candidate)) {
    return candidate.includes(value);
  }

  return value === candidate;
}
