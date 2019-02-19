export function hasValue(values, value) {
  if (!values) {
    return false;
  }

  if (!Array.isArray(values)) {
    return values === value;
  }

  return values.includes(value);
}

export function deselect(values, deselectValue, options) {
  const { exclusive } = options;

  if (exclusive) {
    return null;
  }

  return values.filter(value => value !== deselectValue);
}

export function select(values, value, options = {}) {
  const { exclusive } = options;

  if (exclusive) {
    return value;
  }

  return values ? [...values, value] : [value];
}
export function toggle(values, toggleValue, options) {
  return hasValue(values, toggleValue, options)
    ? deselect(values, toggleValue, options)
    : select(values, toggleValue, options);
}
