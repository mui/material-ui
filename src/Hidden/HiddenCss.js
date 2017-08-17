/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import warning from 'warning';
import classNames from 'classnames';
import { keys as breakpoints } from '../styles/createBreakpoints';
import { capitalizeFirstLetter } from '../utils/helpers';
import withStyles from '../styles/withStyles';
import type { HiddenProps } from './types';

type DefaultProps = {
  classes: Object,
};

export type Props = HiddenProps & {
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
};

function generateStyles(theme) {
  const hidden = {
    display: 'none',
  };

  return theme.breakpoints.keys.reduce((styles, key) => {
    styles[`only${capitalizeFirstLetter(key)}`] = {
      [theme.breakpoints.only(key)]: hidden,
    };
    styles[`${key}Up`] = {
      [theme.breakpoints.up(key)]: hidden,
    };
    styles[`${key}Down`] = {
      [theme.breakpoints.down(key)]: hidden,
    };

    return styles;
  }, {});
}

const styles = (theme: Object) => generateStyles(theme);

type AllProps = DefaultProps & Props;

/**
 * @ignore - internal component.
 */
function HiddenCss(props: AllProps) {
  const {
    children,
    classes,
    only,
    xsUp,
    smUp,
    mdUp,
    lgUp,
    xlUp,
    xsDown,
    smDown,
    mdDown,
    lgDown,
    xlDown,
    ...other
  } = props;

  warning(
    Object.keys(other).length === 0 ||
      (Object.keys(other).length === 1 && other.hasOwnProperty('ref')),
    `Material-UI: unsupported properties received ${JSON.stringify(other)} by \`<Hidden />\`.`,
  );

  const className = [];

  for (let i = 0; i < breakpoints.length; i += 1) {
    const breakpoint = breakpoints[i];
    const breakpointUp = props[`${breakpoint}Up`];
    const breakpointDown = props[`${breakpoint}Down`];

    if (breakpointUp) {
      className.push(classes[`${breakpoint}Up`]);
    }
    if (breakpointDown) {
      className.push(classes[`${breakpoint}Down`]);
    }
  }

  if (only) {
    className.push(classes[`only${capitalizeFirstLetter(only)}`]);
  }

  if (!React.isValidElement(children)) {
    return null;
  }

  return React.cloneElement(children, {
    className: classNames(children.props.className, className.join(' ')),
  });
}

export default withStyles(styles, { name: 'MuiHiddenCss' })(HiddenCss);
