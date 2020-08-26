import validator from 'validator';

export function email(value: string) {
  return value && !validator.isEmail(value.trim()) ? 'Invalid email' : null;
}

function isDirty(value: string) {
  return value;
}

export function required(
  requiredFields: string[],
  values: { [index: string]: string },
): { [index: string]: string | null } {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: 'Required' }),
    }),
    {},
  );
}
