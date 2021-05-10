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

export default function FormPropsSelectFields() {
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
          required
          id="outlined-required"
          label="Required"
          value={currency}
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          disabled
          id="outlined-disabled"
          label="Disabled"
          value={currency}
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          id="outlined-read-only-input"
          label="Read Only"
          value={currency}
          onChange={handleChange}
          InputProps={{
            readOnly: true,
          }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
      </div>
      <div>
        <SelectField
          required
          id="filled-required"
          label="Required"
          value={currency}
          onChange={handleChange}
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          disabled
          id="filled-disabled"
          label="Disabled"
          value={currency}
          onChange={handleChange}
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          id="filled-read-only-input"
          label="Read Only"
          value={currency}
          onChange={handleChange}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          id="filled-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
      </div>
      <div>
        <SelectField
          required
          id="standard-required"
          label="Required"
          value={currency}
          onChange={handleChange}
          variant="standard"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          disabled
          id="standard-disabled"
          label="Disabled"
          value={currency}
          onChange={handleChange}
          variant="standard"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          id="standard-read-only-input"
          label="Read Only"
          value={currency}
          onChange={handleChange}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          id="standard-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="standard"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
      </div>
    </Box>
  );
}
