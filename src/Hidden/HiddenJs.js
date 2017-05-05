// @flow
import React, { Element, isValidElement } from 'react';
import { keys as breakpoints } from '../styles/breakpoints';
import withWidth, { isWidthDown, isWidthUp } from '../utils/withWidth';
import type { HiddenProps } from './types';

type Props = HiddenProps & {
  /**
   * If string or Function, component is used as the root node and all other props are passed
   * including children.
   * If an Element, it will be rendered as-is and no other props are propagated.
   */
  component: string | Function | Element<*>,
  /**
   * @ignore
   * width prop provided by withWidth decorator
   */
  width: string,
};

/**
 * Responsively hides by omission.
 */
function HiddenJs(props: Props) {
  const {
    children,
    component: ComponentProp,
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

  let visible = true;

  // `only` check is faster to get out sooner if used.
  if (only) {
    if (Array.isArray(only)) {
      for (let i = 0; i < only.length; i += 1) {
        const breakpoint = only[i];
        if (width === breakpoint) {
          visible = false;
          break;
        }
      }
    } else if (only && width === only) {
      visible = false;
    }
  }

  // Allow `only` to be combined with other props. If already hidden, no need to check others.
  if (visible) {
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

  // render `string | Function` with any optional props
  if (typeof ComponentProp === 'string' || typeof ComponentProp === 'function') {
    return (
      <ComponentProp {...other}>
        {children}
      </ComponentProp>
    );
  }

  // render any Element exactly as given
  if (isValidElement(ComponentProp)) {
    return React.Children.only(ComponentProp);
  }

  throw new Error(`Invalid component: ${typeof ComponentProp}`);
}

export default withWidth()(HiddenJs);
