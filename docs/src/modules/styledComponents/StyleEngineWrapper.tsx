import * as React from 'react';
import { once } from 'es-toolkit/function';
import type { StyleEngineWrapperProps } from '@mui/internal-core-docs/DemoContext';

type Bundle = [typeof import('styled-components'), typeof import('@mui/stylis-plugin-rtl')];

let loadedBundle: Bundle | undefined;

const loadBundle = once(async (): Promise<Bundle> => {
  loadedBundle = await Promise.all([import('styled-components'), import('@mui/stylis-plugin-rtl')]);
  return loadedBundle;
});

/**
 * Points styled-components at `container` and `direction` for the docs demos
 * that use it. `styled-components` and the RTL stylis plugin stay in a chunk
 * fetched on first use, then seed every later mount synchronously.
 */
export default function StyleEngineWrapper(props: StyleEngineWrapperProps) {
  const { children, container, direction } = props;
  const [bundle, setBundle] = React.useState<Bundle | null>(() => loadedBundle ?? null);

  React.useEffect(() => {
    if (bundle) {
      return undefined;
    }
    let active = true;
    loadBundle().then((loaded) => {
      if (active) {
        setBundle(loaded);
      }
    });
    return () => {
      active = false;
    };
  }, [bundle]);

  // `undefined` reuses the parent stylis instance; `[]` would rebuild it on every render.
  const stylisPlugins = React.useMemo(() => {
    if (!bundle || direction !== 'rtl') {
      return undefined;
    }
    const [, { default: rtlPlugin }] = bundle;
    return [rtlPlugin];
  }, [bundle, direction]);

  if (!bundle) {
    return children;
  }

  const [{ StyleSheetManager }] = bundle;
  return (
    <StyleSheetManager target={container} stylisPlugins={stylisPlugins}>
      {children}
    </StyleSheetManager>
  );
}
