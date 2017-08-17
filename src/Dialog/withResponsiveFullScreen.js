// @flow

import type { Element } from 'react';
import createEagerFactory from 'recompose/createEagerFactory';
import wrapDisplayName from 'recompose/wrapDisplayName';
import withWidth, { isWidthDown } from '../utils/withWidth';
import Dialog from './Dialog';
import type { Breakpoint } from '../styles/createBreakpoints';

type Options = { breakpoint: Breakpoint };

/**
 * Dialog will responsively be full screen *at or below* the given breakpoint
 * (defaults to 'sm' for mobile devices).
 * Notice that this Higher-order Component is incompatible with server side rendering.
 */
function withResponsiveFullScreen(options: Options = { breakpoint: 'sm' }) {
  const { breakpoint } = options;

  return (BaseDialog: Element<typeof Dialog>) => {
    const factory = createEagerFactory(BaseDialog);

    function ResponsiveFullScreen(props: { width: string }) {
      return factory({
        fullScreen: isWidthDown(breakpoint, props.width),
        ...props,
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      ResponsiveFullScreen.displayName = wrapDisplayName(BaseDialog, 'withResponsiveFullScreen');
    }

    return withWidth()(ResponsiveFullScreen);
  };
}

export default withResponsiveFullScreen;
