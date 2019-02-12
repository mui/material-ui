import React from 'react';
import clsx from 'clsx';
import MuiTypography from '@material-ui/core/Typography';
import { TEXT } from '../../theme/core';

const Typography = ({
  className,
  bold,
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
    className={clsx(
      TEXT.root,
      className,
      bold && TEXT.bold,
      icon && TEXT.icon,
      link && TEXT.link,
      linkInverted && TEXT.linkInverted,
      inverted && TEXT.inverted,
      indented && TEXT.indented,
      light && TEXT.light,
      lightWeight && TEXT.lightWeight,
    )}
    {...props}
  />
);

export default Typography;
