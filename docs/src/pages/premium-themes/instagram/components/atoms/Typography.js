import React from 'react';
import cx from 'classnames';
import MuiTypography from '@material-ui/core/Typography';
import { TEXT } from '../../theme/core';

const Typography = ({
  className,
  bold,
  inline,
  link,
  linkInverted,
  icon,
  inverted,
  indented,
  light,
  lightWeight,
  ...props
}) => (
  <MuiTypography
    className={cx(
      TEXT.root,
      className,
      bold && TEXT.bold,
      inline && TEXT.inline,
      icon && TEXT.icon,
      link && TEXT.link,
      linkInverted && TEXT.linkInverted,
      inverted && TEXT.inverted,
      indented && TEXT.indented,
      light && TEXT.light,
      lightWeight && TEXT.lightWeight
    )}
    {...props}
  />
);

export default Typography;
