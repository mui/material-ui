// @flow

import React from 'react';
import type { HigherOrderComponent } from 'react-flow-types';
import wrapDisplayName from 'recompose/wrapDisplayName';
import withWidth, { isWidthDown } from '../utils/withWidth';
import type { Breakpoint } from '../styles/createBreakpoints';

type Options = { breakpoint: Breakpoint };

export type InjectedProps = {
  /**
   * If isWidthDown(options.breakpoint), return true.
   */
  fullScreen: boolean,
};

/**
 * Dialog will responsively be full screen *at or below* the given breakpoint
 * (defaults to 'sm' for mobile devices).
 * Notice that this Higher-order Component is incompatible with server side rendering.
 */
const withMobileDialog = (
  options: Options = { breakpoint: 'sm' },
): HigherOrderComponent<{}, InjectedProps> => (Component: any): any => {
  const { breakpoint } = options;

  function WithMobileDialog(props: { width: string }) {
    return <Component fullScreen={isWidthDown(breakpoint, props.width)} {...props} />;
  }

  if (process.env.NODE_ENV !== 'production') {
    WithMobileDialog.displayName = wrapDisplayName(Component, 'withMobileDialog');
  }

  return withWidth()(WithMobileDialog);
};

export default withMobileDialog;
