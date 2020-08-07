import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const values = ['I', 'Do not', 'Overflow'];

export default function SelectChips() {
  return (
    <Select
      multiple
      value={values}
      style={{ maxWidth: 100 }}
      renderValue={(selected) => (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
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
