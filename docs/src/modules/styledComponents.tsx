import * as React from 'react';
import type { StyleEngine, StyleEngineScopeProps } from '@mui/internal-core-docs/styleEngine';

type Bundle = {
  StyleSheetManager: (typeof import('styled-components'))['StyleSheetManager'];
  stylisPlugins: [(typeof import('@mui/stylis-plugin-rtl'))['default']];
};

// Resolves to `null` instead of rejecting when the chunk fails to load, so the page keeps working
// with these styles missing. `use()` rethrows a rejection, and nothing above either render spot
// catches it, so the page would be replaced by Next's error page.
let bundlePromise: Promise<Bundle | null> | undefined;
function loadBundle() {
  bundlePromise ??= Promise.all([import('styled-components'), import('@mui/stylis-plugin-rtl')])
    .then(([{ StyleSheetManager }, { default: rtlPlugin }]): Bundle => ({
      StyleSheetManager,
      // Built once so `StyleSheetManager` gets the same array every render. A new one each time
      // makes it rebuild its stylis instance.
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
  // No demo in these docs uses styled-components inside an iframe, so there is only work to do
  // when the direction flips. If a styled-components demo is ever framed, run this when
  // `container` is set too, or that demo injects its styles into the parent document.
  if (props.direction !== 'rtl') {
    return props.children;
  }
  // Rendering `children` as the fallback keeps them visible while the chunk loads. Nothing above
  // either render spot provides a Suspense boundary, so this one is needed.
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
