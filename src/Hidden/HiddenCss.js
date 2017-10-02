/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import type { Node } from 'react';
import warning from 'warning';
import { keys as breakpointKeys } from '../styles/createBreakpoints';
import { capitalizeFirstLetter } from '../utils/helpers';
import withStyles from '../styles/withStyles';
import type { HiddenProps } from './types';

export type Props = HiddenProps & {
  /**
   * The content of the component.
   */
  children: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
};

function generateStyles(theme) {
  const hidden = {
    display: 'none',
  };

  return breakpointKeys.reduce((styles, key) => {
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

/**
 * @ignore - internal component.
 */
function HiddenCss(props: Props) {
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
    `Material-UI: unsupported properties received ${Object.keys(other).join(
      ', ',
    )} by \`<Hidden />\`.`,
  );

  const className = [];

  for (let i = 0; i < breakpointKeys.length; i += 1) {
    const breakpoint = breakpointKeys[i];
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

  return <span className={className}>{children}</span>;
}

export default withStyles(styles, { name: 'MuiHiddenCss' })(HiddenCss);
