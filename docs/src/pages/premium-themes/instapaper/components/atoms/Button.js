import React from 'react';
import clsx from 'clsx';
import MuiButton from '@material-ui/core/Button';
import { BUTTON } from '../../theme/core';

const Button = ({ className, inverted, danger, ...props }) => (
  <MuiButton
    className={clsx(BUTTON.root, className, inverted && BUTTON.inverted, danger && BUTTON.danger)}
    {...props}
  />
);

export default Button;
