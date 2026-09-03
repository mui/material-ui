type OptionValueTypeValidationParams<Option> = {
  options: readonly Option[];
  componentName: string;
  getOptionValueProp: ((option: Option) => unknown) | undefined;
};

export default function validateOptionValues<Option>({
  options,
  componentName,
  getOptionValueProp,
}: OptionValueTypeValidationParams<Option>) {
  if (!getOptionValueProp) {
    return;
  }

  const seenOptionValues = new Set();
  const reportedDuplicateValues = new Set();

  for (const option of options) {
    const value = getOptionValueProp(option);

    // Only primitive keys can safely identify options in comparisons and lookup maps.
    if (!isValidOptionValue(value)) {
      const invalidValue =
        value === null || Number.isNaN(value)
          ? getOptionValueDescription(value)
          : `a value of type ${typeof value}`;

      console.error(
        `MUI: The \`getOptionValue\` method of ${componentName} returned ${invalidValue}, which is not a valid option value.\n` +
          `${componentName} uses this value to identify and match options. ` +
          'Return a unique string, number, bigint, or boolean for every option.',
      );
    }

    // Report a duplicated key once even when more than two options share it.
    if (seenOptionValues.has(value) && !reportedDuplicateValues.has(value)) {
      console.error(
        `MUI: The \`getOptionValue\` method of ${componentName} returned the duplicate value ${getOptionValueDescription(
          value,
        )} for multiple options.\n` +
          `${componentName} uses these values to identify options. ` +
          'Change `getOptionValue` or the options so that every option has a unique value.',
      );
      reportedDuplicateValues.add(value);
    }

    seenOptionValues.add(value);
  }
}

function isValidOptionValue(value: unknown) {
  const valueType = typeof value;
  return (
    (valueType === 'string' ||
      valueType === 'number' ||
      valueType === 'bigint' ||
      valueType === 'boolean') &&
    !Number.isNaN(value)
  );
}

function getOptionValueDescription(value: unknown) {
  if (typeof value === 'string') {
    return JSON.stringify(value);
  }
  if (typeof value === 'bigint') {
    return `${value.toString()}n`;
  }
  return String(value);
}
