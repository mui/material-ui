'use client';
import type * as React from 'react';
import PropTypes from 'prop-types';

export interface StyledEngineProviderProps {
  children?: React.ReactNode;
}

let warnedEnableCssLayer = false;
let warnedInjectFirst = false;

export default function StyledEngineProvider(props: StyledEngineProviderProps): React.JSX.Element {
  if (process.env.NODE_ENV !== 'production') {
    // JavaScript apps get no type error, and the styles change silently.
    if ('enableCssLayer' in props && !warnedEnableCssLayer) {
      warnedEnableCssLayer = true;
      console.error(
        [
          'MUI: The `enableCssLayer` prop of `StyledEngineProvider` was removed in v10.',
          "Material UI's styles are always in the `mui` layer, so remove the prop.",
          'If a `GlobalStyles` inside it declares the layer order, move that order to the top of your global CSS file.',
          'See https://mui.com/material-ui/migration/upgrade-to-v10/#enablecsslayer-removed',
        ].join('\n'),
      );
    }
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
