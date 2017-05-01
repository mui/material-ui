// @flow
/**
 * Responsively hides children by omission.
 */
import React, { Element, PureComponent } from 'react';
import { keys as breakpoints } from '../styles/breakpoints';
import withWidth, { isWidthDown, isWidthUp } from '../utils/withWidth';
import type { DefaultProps, Props } from './Hidden';
import { defaultProps } from './Hidden';

type JsProps = Props & {
  /**
   * @ignore
   * width prop provided by withWidth decorator
   */
    width: string,
};

class HiddenJs extends PureComponent<DefaultProps, JsProps, void> {
  static defaultProps: DefaultProps = defaultProps;
  props: JsProps;

  render(): ?Element<any> {
    const {
      children,
      component: ComponentProp,
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
    } = this.props;

    let visible = true;

    // determine visibility based on the smallest size up
    for (let i = 0; i < breakpoints.length; i += 1) {
      const breakpoint = breakpoints[i];
      const breakpointUp = this.props[`${breakpoint}Up`];
      const breakpointDown = this.props[`${breakpoint}Down`];
      if (
        (breakpointUp && isWidthUp(width, breakpoint)) ||
        (breakpointDown && (isWidthDown(width, breakpoint, true)))
      ) {
        visible = false;
        break;
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
}
// for testing purposes
export { HiddenJs };

export default withWidth(HiddenJs);
