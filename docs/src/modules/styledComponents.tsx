import * as React from 'react';
import { once } from 'es-toolkit/function';
import type { StyleEngine, StyleEngineScopeProps } from '@mui/internal-core-docs/styleEngine';

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

function StyleEngineWrapper(props: StyleEngineScopeProps) {
  // `children` as the fallback keeps the subtree visible while the chunk loads. There is no
  // Suspense boundary anywhere above either render position, so this one is required.
  return (
    <React.Suspense fallback={props.children}>
      <StyleEngineScope {...props} />
    </React.Suspense>
  );
}

/**
 * The styled-components engine for the docs. Both halves reach `styled-components` only through
 * `import()`, so it stays out of the app bundle.
 */
const styledComponentsEngine: StyleEngine = {
  Wrapper: StyleEngineWrapper,
  createDocumentPlugin: async () => {
    const { ServerStyleSheet } = await import('styled-components');
    const sheet = new ServerStyleSheet();

    return {
      enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      resolveProps: async (initialProps) => {
        const styles = [sheet.getStyleElement(), ...React.Children.toArray(initialProps.styles)];
        // After `getStyleElement()`, which throws once the sheet is sealed.
        sheet.seal();
        return { ...initialProps, styles };
      },
    };
  },
};

export default styledComponentsEngine;
