import * as React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default function WithSelect() {
  const [clickedAway, setClickedAway] = React.useState(false);

  return (
    <React.Fragment>
      <div>{clickedAway ? 'onClickAway called' : null}</div>
      <ClickAwayListener onClickAway={() => setClickedAway(true)}>
        <Select value="">
          <MenuItem value={10}>One</MenuItem>
          <MenuItem value={20}>Two</MenuItem>
          <MenuItem value={30}>Three</MenuItem>
        </Select>
      </ClickAwayListener>
    </React.Fragment>
  );
}
