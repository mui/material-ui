import React from 'react';
import cx from 'classnames';
import MuiIcon from '@material-ui/core/Icon';
import { ICON } from '../../theme/core';

const Icon = ({
  className,
  left,
  right,
  front,
  frontFlipped,
  caret,
  linkInverted,
  contained,
  white,
  purple,
  ...props
}) => (
  <MuiIcon
    className={cx(
      ICON.root,
      className,
      left && ICON.left,
      right && ICON.right,
      front && ICON.front,
      frontFlipped && ICON.frontFlipped,
      linkInverted && ICON.linkInverted,
      caret && ICON.caret,
      contained && ICON.contained,
      white && ICON.white,
      purple && ICON.purple,
    )}
    {...props}
  />
);

export default Icon;
