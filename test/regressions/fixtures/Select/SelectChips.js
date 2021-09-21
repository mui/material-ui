import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const values = ['I', 'Do not', 'Overflow'];

export default function SelectChips() {
  return (
    <Select
      multiple
      value={values}
      style={{ maxWidth: 100 }}
      renderValue={(selected) => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {selected.map((value) => (
            <Chip key={value} label={value} style={{ margin: 2 }} />
          ))}
        </div>
      )}
    >
      {values.map((value) => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );
}
