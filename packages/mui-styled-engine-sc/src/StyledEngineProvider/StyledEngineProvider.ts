import type * as React from 'react';
import PropTypes from 'prop-types';

export interface StyledEngineProviderProps {
  children?: React.ReactNode;
}

let warnedInjectFirst = false;

export default function StyledEngineProvider(props: StyledEngineProviderProps): React.JSX.Element {
  if (process.env.NODE_ENV !== 'production') {
    // JavaScript apps get no type error, and the styles change silently.
    if ('injectFirst' in props && !warnedInjectFirst) {
      warnedInjectFirst = true;
      console.error(
        [
          'MUI: The `injectFirst` prop of `StyledEngineProvider` was removed in v10.',
          "CSS that isn't in a layer overrides Material UI's styles wherever it loads, so remove the prop.",
          'See https://mui.com/material-ui/migration/upgrade-to-v10/#injectfirst-removed',
        ].join('\n'),
      );
    }
  }
  return props.children as React.JSX.Element;
}

(StyledEngineProvider as any).propTypes /* remove-proptypes */ = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
};
