type OptionValueTypeValidationParams<Option> = {
  options: readonly Option[];
  freeSolo: boolean;
  getOptionValueProp: ((option: Option) => unknown) | undefined;
  duplicatedErrorMessages: Set<string>;
};

export default function validateOptionValues<Option>({
  options,
  freeSolo,
  getOptionValueProp,
  duplicatedErrorMessages,
}: OptionValueTypeValidationParams<Option>) {
  if (!getOptionValueProp) {
    return;
  }

  const seenOptionValues = new Set();
  const reportedDuplicateValues = new Set();

  for (const option of options) {
    const value = getOptionValueProp(option);

    if (freeSolo && typeof value === 'string') {
      tryShowErrorMessage(
        `MUI: The \`getOptionValue\` method of useAutocomplete returned the string value ${getOptionValueDescription(
          value,
        )} while \`freeSolo\` is enabled.\n` +
          `useAutocomplete cannot distinguish string option values from free-solo values. ` +
          'Return a number, bigint, or boolean from `getOptionValue`, or disable `freeSolo`.',
        duplicatedErrorMessages,
      );
      continue;
    }

    // Only primitive keys can safely identify options in comparisons and lookup maps.
    if (!isValidOptionValue(value)) {
      const invalidValue =
        value === null || Number.isNaN(value)
          ? getOptionValueDescription(value)
          : `a value of type ${typeof value}`;

      tryShowErrorMessage(
        `MUI: The \`getOptionValue\` method of useAutocomplete returned ${invalidValue}, which is not a valid option value.\n` +
          `useAutocomplete uses this value to identify and match options. ` +
          'Return a unique string, number, bigint, or boolean for every option.',
        duplicatedErrorMessages,
      );
    }

    // Report a duplicated key once even when more than two options share it.
    if (seenOptionValues.has(value) && !reportedDuplicateValues.has(value)) {
      tryShowErrorMessage(
        `MUI: The \`getOptionValue\` method of useAutocomplete returned the duplicate value ${getOptionValueDescription(
          value,
        )} for multiple options.\n` +
          `useAutocomplete uses these values to identify options. ` +
          'Change `getOptionValue` or the options so that every option has a unique value.',
        duplicatedErrorMessages,
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

function tryShowErrorMessage(message: string, duplicatedErrorMessages: Set<string>) {
  if (duplicatedErrorMessages.has(message)) {
    return;
  }

  console.error(message);
  duplicatedErrorMessages.add(message);
}
