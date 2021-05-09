import * as React from 'react';
import SelectField from '@material-ui/core/SelectField';
import MenuItem from '@material-ui/core/MenuItem';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function MultipleSelectFields() {
  const [selectedCurrencies, setSelectedCurrencies] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrencies(event.target.value as string[]);
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
