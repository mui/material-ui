export function hasValue(values, value) {
  if (!values) {
    return false;
  }

  if (!Array.isArray(values)) {
    return values === value;
  }

  return values.includes(value);
}

export function deselect(values, deselectValue, exclusive) {
  if (exclusive) {
    return null;
  }

  return values.filter(value => value !== deselectValue);
}

export function select(values, value, exclusive) {
  if (exclusive) {
    return value;
  }

  return values ? [...values, value] : [value];
}
export function toggle(values, toggleValue, exclusive) {
  return hasValue(values, toggleValue)
    ? deselect(values, toggleValue, exclusive)
    : select(values, toggleValue, exclusive);
}
