/* eslint-disable react/prop-types */

import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function NestedMenu(props) {
  const rootRef = React.useRef(null);

  return (
    <div>
      <button type="button" ref={rootRef}>
        anchor
      </button>
      <Menu
        anchorEl={() => rootRef.current}
        id="second-menu"
        open={props.secondMenuOpen || false}
        transitionDuration={0}
      >
        <MenuItem>Second Menu</MenuItem>
      </Menu>
      <Menu
        anchorEl={() => rootRef.current}
        id="first-menu"
        open={props.firstMenuOpen || false}
        transitionDuration={0}
      >
        <MenuItem>Profile 1</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default NestedMenu;
