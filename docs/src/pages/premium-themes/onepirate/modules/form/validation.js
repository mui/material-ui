// Simplified method of validator/lib/isEmail
function isEmail(string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEFaa-zA-Z\-0-9]+\.)+[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEFaa-zA-Z]{2,}))$/;
  return re.test(string);
}

export function email(value) {
  return value && !isEmail(value.trim()) ? 'Invalid email' : null;
}

function isDirty(value) {
  return value || value === 0;
}

export function required(requiredFields, values) {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: 'Required' }),
    }),
    {},
  );
}
