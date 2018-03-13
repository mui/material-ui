import React from 'react';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

function SelectOverflow() {
  return (
    <Select value={10} style={{ maxWidth: 100 }}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Tennnnnnn</MenuItem>
    </Select>
  );
}

export default SelectOverflow;
