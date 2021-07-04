// Simplified method of validator/lib/isEmail
function isEmail(string: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(string);
}

export function email(value: string) {
  return value && !isEmail(value.trim()) ? 'Invalid email' : null;
}

function isDirty(value: string | number) {
  return value || value === 0;
}

export function required(
  requiredFields: readonly string[],
  values: Record<string, string>,
): Record<string, string> {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: 'Required' }),
    }),
    {},
  );
}
