import * as React from 'react';
import SelectField from '@material-ui/core/SelectField';

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

export default function NativeSelectField() {
  const [currency, setCurrency] = React.useState('USD');

  const handleChange = (event) => {
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
