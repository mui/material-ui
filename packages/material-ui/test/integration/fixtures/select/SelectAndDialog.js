// @flow

import React from 'react';
import { MenuItem } from 'packages/material-ui/src/Menu';
import Select from 'packages/material-ui/src/Select';
import Dialog from 'packages/material-ui/src/Dialog';

type Props = {
  MenuProps?: Object,
};

function SelectAndDialog(props: Props) {
  return (
    <Dialog open>
      <Select value={10} MenuProps={props.MenuProps}>
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
