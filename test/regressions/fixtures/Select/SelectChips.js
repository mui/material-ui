import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

const values = ['I', 'Do not', 'Overflow'];

export default function SelectChips() {
  return (
    <Select
      multiple
      value={values}
      sx={{ maxWidth: 100 }}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {selected.map((value) => (
            <Chip key={value} label={value} sx={{ margin: '2px' }} />
          ))}
        </Box>
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
