import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function SelectOverflow() {
  return (
    <div style={{ height: 130, width: 100 }}>
      <Select MenuProps={{ transitionDuration: 0 }} open value="first">
        <MenuItem value="first">First</MenuItem>
        <MenuItem autoFocus value="second">
          Second
        </MenuItem>
      </Select>
    </div>
  );
}

export default SelectOverflow;
