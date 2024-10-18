import { SelectOption } from '../useOption';

function defaultOptionStringifier<OptionValue>(option: SelectOption<OptionValue>) {
  const { label, value } = option;
  if (typeof label === 'string') {
    return label;
  }

  if (typeof value === 'string') {
    return value;
  }

  // Fallback string representation
  return String(option);
}

export { defaultOptionStringifier };
