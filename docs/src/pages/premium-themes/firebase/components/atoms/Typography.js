import React from 'react';
import cx from 'classnames';
import MuiTypography from '@material-ui/core/Typography';
import { TEXT } from '../../theme/core';

const Typography = ({
  className,
  inline,
  link,
  linkInverted,
  icon,
  inverted,
  indented,
  light,
  ...props
}) => (
  <MuiTypography
    className={cx(
      TEXT.root,
      className,
      inline && TEXT.inline,
      icon && TEXT.icon,
      link && TEXT.link,
      linkInverted && TEXT.linkInverted,
      inverted && TEXT.inverted,
      indented && TEXT.indented,
      light && TEXT.light
    )}
    {...props}
  />
);

export default Typography;
