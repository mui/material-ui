// @flow

import createEagerFactory from 'recompose/createEagerFactory';
import wrapDisplayName from 'recompose/wrapDisplayName';
import withWidth, { isWidthDown } from '../utils/withWidth';
import Dialog from './Dialog';
import type { Breakpoint } from '../styles/breakpoints';

type Options = { breakpoint: Breakpoint };

/**
 * Dialog will responsively be full screen _at or below_ the given breakpoint
 * (defaults to 'sm' for mobile devices).
 */
function withResponsiveFullScreen(options: Options = { breakpoint: 'sm' }) {
  const { breakpoint } = options;

  return (BaseDialog: Dialog) => {
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
