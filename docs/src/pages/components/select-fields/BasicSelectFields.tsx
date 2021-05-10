import * as React from 'react';
import Box from '@material-ui/core/Box';
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

export default function BasicSelectFields() {
  const [currency, setCurrency] = React.useState<CurrencyValue>('EUR');

  const handleChange = (event: React.ChangeEvent<{ value: CurrencyValue }>) => {
    setCurrency(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiSelectField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <SelectField
          id="outlined-select-currency"
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          id="outlined-select-currency-native"
          label="Native select"
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
      </div>
      <div>
        <SelectField
          id="filled-select-currency"
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          id="filled-select-currency-native"
          label="Native select"
          native
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
          variant="filled"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </div>
      <div>
        <SelectField
          id="standard-select-currency"
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
          variant="standard"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          id="standard-select-currency-native"
          label="Native select"
          native
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
          variant="standard"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </div>
    </Box>
  );
}
