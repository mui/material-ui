import * as React from 'react';
import type { StyleEngineWrapperProps } from '@mui/internal-core-docs/DemoContext';

type Bundle = {
  StyleSheetManager: (typeof import('styled-components'))['StyleSheetManager'];
  rtlPlugin: (typeof import('@mui/stylis-plugin-rtl'))['default'];
};

let bundlePromise: Promise<Bundle> | undefined;
function loadBundle() {
  if (!bundlePromise) {
    bundlePromise = Promise.all([
      import('styled-components'),
      import('@mui/stylis-plugin-rtl'),
    ]).then(([{ StyleSheetManager }, { default: rtlPlugin }]) => ({
      StyleSheetManager,
      rtlPlugin,
    }));
  }
  return bundlePromise;
}

/**
 * Points styled-components at `container` and `direction` for the docs demos
 * that use it. `styled-components` and the RTL stylis plugin stay in a chunk
 * loaded on first use.
 */
export default function StyleEngineWrapper(props: StyleEngineWrapperProps) {
  const { children, container, direction } = props;
  const [bundle, setBundle] = React.useState<Bundle | null>(null);

  React.useEffect(() => {
    loadBundle().then(setBundle);
  }, []);

  if (!bundle) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  const { StyleSheetManager, rtlPlugin } = bundle;
  return (
    <StyleSheetManager target={container} stylisPlugins={direction === 'rtl' ? [rtlPlugin] : []}>
      {children}
    </StyleSheetManager>
  );
}
