import * as React from 'react';
import { once } from 'es-toolkit/function';
import type { StyleEngineScopeProps } from '@mui/internal-core-docs/styleEngine';

type Bundle = [typeof import('styled-components'), typeof import('@mui/stylis-plugin-rtl')];

// Resolving to `null` rather than rejecting keeps a failed chunk load degrading to an
// unstyled-by-this-engine page. `use()` rethrows a rejection, and neither render position has an
// error boundary that recovers: the page shell would be replaced by Next's error page.
const loadBundle = once((): Promise<Bundle | null> =>
  Promise.all([import('styled-components'), import('@mui/stylis-plugin-rtl')]).catch((error) => {
    console.error('Failed to load the styled-components style engine.', error);
    return null;
  }),
);

function StyleEngineScope(props: StyleEngineScopeProps) {
  const { children, container, direction } = props;
  const bundle = React.use(loadBundle());

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

/**
 * Points styled-components at `container` and `direction` for the docs demos that use it.
 * `styled-components` and the RTL stylis plugin stay in a chunk fetched on first use.
 */
export default function StyleEngineWrapper(props: StyleEngineScopeProps) {
  // `children` as the fallback keeps the subtree visible while the chunk loads. There is no
  // Suspense boundary anywhere above either render position, so this one is required.
  return (
    <React.Suspense fallback={props.children}>
      <StyleEngineScope {...props} />
    </React.Suspense>
  );
}
