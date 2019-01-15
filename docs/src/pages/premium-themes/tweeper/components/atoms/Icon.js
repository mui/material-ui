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
  link,
  linkInverted,
  contained,
  white,
  purple,
  text,
  light,
  ...props
}) => (
  <MuiIcon
    className={cx(
      ICON.root,
      className,
      left && ICON.left,
      right && ICON.right,
      front && ICON.front,
      link && ICON.link,
      frontFlipped && ICON.frontFlipped,
      linkInverted && ICON.linkInverted,
      caret && ICON.caret,
      contained && ICON.contained,
      white && ICON.white,
      purple && ICON.purple,
      text && ICON.text,
      light && ICON.light,
    )}
    {...props}
  />
);

export default Icon;
