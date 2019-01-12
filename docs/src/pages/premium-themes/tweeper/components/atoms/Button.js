import React from 'react';
import cx from 'classnames';
import MuiButton from '@material-ui/core/Button';
import { BUTTON } from '../../theme/core';

const Button = ({ className, large, inverted, danger, ...props }) => (
  <MuiButton
    className={cx(
      BUTTON.root,
      className,
      inverted && BUTTON.inverted,
      danger && BUTTON.danger,
      large && BUTTON.large,
    )}
    {...props}
  />
);

export default Button;
