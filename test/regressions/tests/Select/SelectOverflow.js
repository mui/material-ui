import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function SelectOverflow() {
  return (
    <Select value={10} style={{ maxWidth: 100 }}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Tennnnnnn</MenuItem>
    </Select>
  );
}
