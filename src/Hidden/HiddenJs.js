// @flow
/**
 * Responsively hides children by omission.
 */
import React, { Element } from 'react';
import { keys as breakpoints } from '../styles/breakpoints';
import withWidth, { isWidthDown, isWidthUp } from '../utils/withWidth';
import type { HiddenProps } from './Hidden';
import { defaultProps } from './Hidden';

type Props = HiddenProps & {
  /**
   * @ignore
   * width prop provided by withWidth decorator
   */
    width: string,
};

function HiddenJs(props: Props): ?Element<any> {
  const {
    children,
    component,
    only,
    xsUp, // eslint-disable-line no-unused-vars
    smUp, // eslint-disable-line no-unused-vars
    mdUp, // eslint-disable-line no-unused-vars
    lgUp, // eslint-disable-line no-unused-vars
    xlUp, // eslint-disable-line no-unused-vars
    xsDown, // eslint-disable-line no-unused-vars
    smDown, // eslint-disable-line no-unused-vars
    mdDown, // eslint-disable-line no-unused-vars
    lgDown, // eslint-disable-line no-unused-vars
    xlDown, // eslint-disable-line no-unused-vars
    width,
    ...other
  } = props;

  // workaround: see https://github.com/facebook/flow/issues/1660#issuecomment-297775427
  const ComponentProp = component || defaultProps.component;
  let visible = true;

  // `only` takes priority.
  if (only && width === only) {
    visible = false;
  } else {
    // determine visibility based on the smallest size up
    for (let i = 0; i < breakpoints.length; i += 1) {
      const breakpoint = breakpoints[i];
      const breakpointUp = props[`${breakpoint}Up`];
      const breakpointDown = props[`${breakpoint}Down`];
      if (
        (breakpointUp && isWidthUp(width, breakpoint)) ||
        (breakpointDown && (isWidthDown(width, breakpoint, true)))
      ) {
        visible = false;
        break;
      }
    }
  }

  if (!visible) {
    return null;
  }

  return (
    <ComponentProp {...other}>
      {children}
    </ComponentProp>
  );
}

HiddenJs.defaultProps = defaultProps;

export default withWidth()(HiddenJs);
