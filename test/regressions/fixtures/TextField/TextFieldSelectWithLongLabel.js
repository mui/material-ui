import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

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

const options = currencies.map((option) => (
  <MenuItem key={option.value} value={option.value}>
    {option.label}
  </MenuItem>
));

export default function TextFieldSelectWithLongLabel() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-select-currency" select label="Super long label that should ellipse" value="">
        {options}
      </TextField>
      <TextField
        id="filled-select-currency"
        select
        label="Super long label that should ellipse"
        variant="filled"
        value=""
      >
        {options}
      </TextField>
      <TextField
        id="standard-select-currency"
        select
        label="Super long label that should ellipse"
        variant="standard"
        value=""
      >
        {options}
      </TextField>
    </Box>
  );
}
