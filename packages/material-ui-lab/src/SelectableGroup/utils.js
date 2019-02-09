export function hasValue(values, value) {
  return values.includes(value);
}

export function deselect(values, deselectValue) {
  return values.filter(value => value !== deselectValue);
}

export function select(values, value, options = {}) {
  const { exclusive } = options;

  if (exclusive) {
    return [value];
  }

  return [...values, value];
}
export function toggle(values, toggleValue, options) {
  return hasValue(values, toggleValue)
    ? deselect(values, toggleValue)
    : select(values, toggleValue, options);
}
