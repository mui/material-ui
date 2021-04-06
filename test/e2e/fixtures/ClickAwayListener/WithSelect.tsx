import * as React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default function WithSelect() {
  const [counter, setCounter] = React.useState(0);

  return (
    <React.Fragment>
      <div id="onClickAway">{counter}</div>
      <ClickAwayListener onClickAway={() => setCounter(counter + 1)}>
        <Select value="">
          <MenuItem value={10}>One</MenuItem>
          <MenuItem value={20}>Two</MenuItem>
          <MenuItem value={30}>Three</MenuItem>
        </Select>
      </ClickAwayListener>
    </React.Fragment>
  );
}
