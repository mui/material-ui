import * as React from 'react';
import SelectField from '@material-ui/core/SelectField';

const currencies = [
  {
    value: 'USD' as const,
    label: '$',
  },
  {
    value: 'EUR' as const,
    label: '€',
  },
  {
    value: 'BTC' as const,
    label: '฿',
  },
  {
    value: 'JPY' as const,
    label: '¥',
  },
];
type CurrencyValue = typeof currencies extends Array<{ value: infer U }> ? U : never;

export default function NativeSelectField() {
  const [currency, setCurrency] = React.useState<CurrencyValue>('USD');

  const handleChange = (event: React.ChangeEvent<{ value: CurrencyValue }>) => {
    setCurrency(event.target.value);
  };

  return (
    <SelectField
      id="outlined-select-currency"
      label="Native Select"
      native
      value={currency}
      onChange={handleChange}
      helperText="Please select your currency"
    >
      {currencies.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectField>
  );
}
