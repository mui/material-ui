import { SelectOption } from './useSelect.types';

const defaultOptionStringifier = <TValue>(option: SelectOption<TValue>) => {
  const { label, value } = option;
  if (typeof label === 'string') {
    return label;
  }

  if (typeof value === 'string') {
    return value;
  }

  // Fallback string representation
  return String(option);
};

export default defaultOptionStringifier;
