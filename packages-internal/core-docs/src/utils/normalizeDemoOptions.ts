interface DemoDisplayOptions {
  defaultCodeOpen?: boolean;
  initialExpanded?: boolean;
  collapseToEmpty?: boolean;
}

export function normalizeDemoOptions<T extends DemoDisplayOptions>(
  options: T,
): Omit<T, 'defaultCodeOpen'> {
  const { defaultCodeOpen, ...normalized } = options;

  if (defaultCodeOpen === true) {
    return { ...normalized, initialExpanded: true };
  }
  if (defaultCodeOpen === false) {
    return { ...normalized, collapseToEmpty: true };
  }
  return normalized;
}
