// @flow

import React from 'react';
import { MenuItem } from 'src/Menu';
import Select from 'src/Select';
import Dialog from 'src/Dialog';

function SelectAndDialog() {
  return (
    <Dialog open>
      <Select value={10}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </Dialog>
  );
}

export default SelectAndDialog;
