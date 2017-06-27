// @flow

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import { capitalizeFirstLetter } from '../utils/helpers';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiIcon', theme => ({
  root: {
    userSelect: 'none',
  },
  colorAccent: {
    color: theme.palette.accent.A200,
  },
  colorAction: {
    color: theme.palette.action.active,
  },
  colorContrast: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  colorDisabled: {
    color: theme.palette.action.disabled,
  },
  colorError: {
    color: theme.palette.error[500],
  },
  colorPrimary: {
    color: theme.palette.primary[500],
  },
}));

type DefaultProps = {
  color: 'inherit',
};

type Props = DefaultProps & {
  /**
   * The name of the icon font ligature.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color?: 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary',
};

function Icon(props: Props) {
  const { children, classes, className: classNameProp, color, ...other } = props;

  const className = classNames(
    'material-icons',
    classes.root,
    {
      [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'inherit',
    },
    classNameProp,
  );

  return (
    <span className={className} aria-hidden="true" {...other}>
      {children}
    </span>
  );
}

Icon.defaultProps = {
  color: 'inherit',
};

Icon.muiName = 'Icon';

export default withStyles(styleSheet)(Icon);
