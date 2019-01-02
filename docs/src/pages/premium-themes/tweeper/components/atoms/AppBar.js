import React from 'react';
import cx from 'classnames';
import MuiAppBar from '@material-ui/core/AppBar';
import { APP_BAR } from '../../theme/core';

const AppBar = ({ className, shaded, ...props }) => (
  <MuiAppBar
    src="https://pbs.twimg.com/profile_images/1060539954361622533/-9ofKMvA_400x400.jpg"
    className={cx(APP_BAR.root, className, shaded && APP_BAR.shaded)}
    {...props}
  />
);

export default AppBar;
