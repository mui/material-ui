import * as React from 'react';
import type { StyleEngine, StyleEngineScopeProps } from '@mui/internal-core-docs/styleEngine';

type StyledComponents = typeof import('styled-components');
type RtlStylisPlugins = [(typeof import('@mui/stylis-plugin-rtl'))['default']];

// Resolving to `null` rather than rejecting keeps a failed chunk load degrading to an
// unstyled-by-this-engine page. `use()` rethrows a rejection, and neither render position has an
// error boundary that recovers: the page shell would be replaced by Next's error page.
let enginePromise: Promise<StyledComponents | null> | undefined;
function loadEngine() {
  enginePromise ??= import('styled-components').catch((error) => {
    console.error('Failed to load the styled-components style engine.', error);
    return null;
  });
  return enginePromise;
}

// Resolves to the plugin array rather than the module so its identity is stable: a fresh array
// would make `StyleSheetManager` rebuild its stylis instance on every render.
let stylisPluginsPromise: Promise<RtlStylisPlugins | null> | undefined;
function loadRtlStylisPlugins() {
  stylisPluginsPromise ??= import('@mui/stylis-plugin-rtl')
    .then(({ default: rtlPlugin }): RtlStylisPlugins => [rtlPlugin])
    .catch((error) => {
      console.error('Failed to load the RTL stylis plugin.', error);
      return null;
    });
  return stylisPluginsPromise;
}

function StyleEngineScope(props: StyleEngineScopeProps) {
  const { children, container, direction } = props;
  const engine = React.use(loadEngine());

  let stylisPlugins;
  if (direction === 'rtl') {
    // `undefined` reuses the parent stylis instance.
    stylisPlugins = React.use(loadRtlStylisPlugins()) ?? undefined;
  }

  if (!engine) {
    return children;
  }

  const { StyleSheetManager } = engine;
  return (
    <StyleSheetManager target={container} stylisPlugins={stylisPlugins}>
      {children}
    </StyleSheetManager>
  );
}

function StyleEngineWrapper(props: StyleEngineScopeProps) {
  // On the page in LTR there is nothing to retarget and nothing to flip, so the engine is never
  // fetched. Framed demos always need it: without it they inject into the parent document.
  if (props.container === undefined && props.direction !== 'rtl') {
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
