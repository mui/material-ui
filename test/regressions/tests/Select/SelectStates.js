import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function SelectOverflow() {
  return (
    <div style={{ height: 130, width: 100 }}>
      <Select MenuProps={{ transitionDuration: 0 }} open value="selected">
        <MenuItem value="selected">Selected</MenuItem>
        <MenuItem autoFocus value="focused">
          Focused
        </MenuItem>
      </Select>
    </div>
  );
}

export default SelectOverflow;
