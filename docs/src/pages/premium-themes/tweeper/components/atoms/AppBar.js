import React from 'react';
import cx from 'classnames';
import MuiAppBar from '@material-ui/core/AppBar';
import { APP_BAR } from '../../theme/core';

const AppBar = ({ className, shaded, ...props }) => (
  <MuiAppBar
    src={'http://i.pravatar.cc/300'}
    className={cx(APP_BAR.root, className, shaded && APP_BAR.shaded)}
    {...props}
  />
);

export default AppBar;
