import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function SelectMissingValue() {
  return (
    <Select value={0}>
      <MenuItem value={10}>Ten</MenuItem>
    </Select>
  );
}
