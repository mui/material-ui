import * as React from 'react';
import type { StyleEngine, StyleEngineScopeProps } from '@mui/internal-core-docs/styleEngine';

type Bundle = {
  StyleSheetManager: (typeof import('styled-components'))['StyleSheetManager'];
  stylisPlugins: [(typeof import('@mui/stylis-plugin-rtl'))['default']];
};

// Resolving to `null` rather than rejecting keeps a failed chunk load degrading to an
// unstyled-by-this-engine page. `use()` rethrows a rejection, and neither render position has an
// error boundary that recovers: the page shell would be replaced by Next's error page.
let bundlePromise: Promise<Bundle | null> | undefined;
function loadBundle() {
  bundlePromise ??= Promise.all([import('styled-components'), import('@mui/stylis-plugin-rtl')])
    .then(([{ StyleSheetManager }, { default: rtlPlugin }]): Bundle => ({
      StyleSheetManager,
      // Built once so `StyleSheetManager` sees a stable `stylisPlugins` identity; a fresh array
      // would make it rebuild its stylis instance on every render.
      stylisPlugins: [rtlPlugin],
    }))
    .catch((error) => {
      console.error('Failed to load the styled-components style engine.', error);
      return null;
    });
  return bundlePromise;
}

function StyleEngineScope(props: StyleEngineScopeProps) {
  const { children, container } = props;
  const bundle = React.use(loadBundle());

  if (!bundle) {
    return children;
  }

  const { StyleSheetManager, stylisPlugins } = bundle;
  return (
    <StyleSheetManager target={container} stylisPlugins={stylisPlugins}>
      {children}
    </StyleSheetManager>
  );
}

function StyleEngineWrapper(props: StyleEngineScopeProps) {
  // No demo in these docs uses styled-components inside an iframe, so the engine only has work to
  // do when it has to flip. Framing a styled-components demo would need this relaxed to also run
  // when `container` is set, otherwise the demo injects into the parent document.
  if (props.direction !== 'rtl') {
    return props.children;
  }
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
