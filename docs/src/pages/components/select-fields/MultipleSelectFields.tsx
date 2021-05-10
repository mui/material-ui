import * as React from 'react';
import SelectField from '@material-ui/core/SelectField';
import MenuItem from '@material-ui/core/MenuItem';

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

export default function MultipleSelectFields() {
  const [selectedCurrencies, setSelectedCurrencies] = React.useState<
    CurrencyValue[]
  >([]);

  const handleChange = (event: React.ChangeEvent<{ value: CurrencyValue[] }>) => {
    setSelectedCurrencies(event.target.value);
  };

  return (
    <SelectField
      id="outlined-select-currency"
      label="Select"
      multiple
      value={selectedCurrencies}
      onChange={handleChange}
      helperText="Please select your currency"
    >
      {currencies.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </SelectField>
  );
}
