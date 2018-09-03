// Determines if the given toggle group value is present.
export default function hasValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return !!value;
}
