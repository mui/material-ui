import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function SelectOverflow() {
  return (
    <Select open value="first">
      <MenuItem value="first">First</MenuItem>
      <MenuItem autoFocus value="second">
        Second
      </MenuItem>
    </Select>
  );
}

export default SelectOverflow;
