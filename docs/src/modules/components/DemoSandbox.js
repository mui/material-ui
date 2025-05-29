import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { prefixer } from 'stylis';
import rtlPlugin from 'mui-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { StyleSheetManager } from 'styled-components';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import { extendTheme, useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { createTheme, useTheme, styled } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import DemoErrorBoundary from 'docs/src/modules/components/DemoErrorBoundary';
import { useTranslate } from '@mui/docs/i18n';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { DemoInstanceThemeProvider } from 'docs/src/theming';
import { ThemeOptionsContext } from 'docs/src/modules/components/ThemeContext';

let globalInjectThemeCache;

function JoyIframeObserver({ document, isolated }) {
  const { mode, systemMode } = useJoyColorScheme();
  React.useEffect(() => {
    if (!isolated) {
      document.documentElement.setAttribute('data-joy-color-scheme', systemMode || mode);
    }
  }, [document, mode, systemMode, isolated]);
  return null;
}
JoyIframeObserver.propTypes = {
  document: PropTypes.object.isRequired,
  isolated: PropTypes.bool,
};

function FramedDemo(props) {
  const { children, document, isJoy, isolated } = props;
  const themeOptions = React.useContext(ThemeOptionsContext);

  const theme = useTheme();

  React.useEffect(() => {
    if (!isolated) {
      document.body.setAttribute('dir', theme.direction);
      document.documentElement.style.colorScheme = themeOptions.paletteMode;
      document.documentElement.setAttribute('data-mui-color-scheme', themeOptions.paletteMode);
    }
  }, [document, isolated, theme.direction, themeOptions.paletteMode]);

  const cache = React.useMemo(
    () =>
      createCache({
        key: `iframe-demo-${theme.direction}`,
        prepend: true,
        container: document.head,
        stylisPlugins: theme.direction === 'rtl' ? [prefixer, rtlPlugin] : [prefixer],
      }),
    [document, theme.direction],
  );

  const getWindow = React.useCallback(() => document.defaultView, [document]);

  // This theme only used for generating CSS variables, NOT with the React context (ThemeProvider).
  const iframeTheme = React.useMemo(() => {
    if (isolated) {
      return null;
    }
    return isJoy
      ? extendTheme()
      : createTheme({
          colorSchemes: { light: true, dark: true },
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
          },
        });
  }, [isJoy, isolated]);

  return (
    <StyleSheetManager
      target={document.head}
      stylisPlugins={theme.direction === 'rtl' ? [rtlPlugin] : []}
    >
      <CacheProvider value={cache}>
        {iframeTheme && <GlobalStyles styles={iframeTheme.generateStyleSheets?.() || []} />}
        {React.cloneElement(children, {
          window: getWindow,
        })}
        {isJoy && <JoyIframeObserver document={document} isolated={isolated} />}
      </CacheProvider>
    </StyleSheetManager>
  );
}
FramedDemo.propTypes = {
  children: PropTypes.node,
  document: PropTypes.object.isRequired,
  isJoy: PropTypes.bool,
  isolated: PropTypes.bool,
};

const Iframe = styled('iframe')(({ theme }) => ({
  backgroundColor: (theme.vars || theme).palette.background.default,
  flexGrow: 1,
  height: 400,
  border: 0,
  boxShadow: (theme.vars || theme)?.shadows?.[1],
}));

function DemoIframe(props) {
  const { children, name, isJoy, isolated, ...other } = props;
  /**
   * @type {import('react').Ref<HTMLIFrameElement>}
   */
  const frameRef = React.useRef(null);

  // If we portal content into the iframe before the load event then that content
  // is dropped in firefox.
  const [iframeLoaded, onLoad] = React.useReducer(() => true, false);

  React.useEffect(() => {
    const document = frameRef.current.contentDocument;
    // When we hydrate the iframe then the load event is already dispatched
    // once the iframe markup is parsed (maybe later but the important part is
    // that it happens before React can attach event listeners).
    // We need to check the readyState of the document once the iframe is mounted
    // and "replay" the missed load event.
    // See https://github.com/facebook/react/pull/13862 for ongoing effort in React
    // (though not with iframes in mind).
    if (document != null && document.readyState === 'complete' && !iframeLoaded) {
      onLoad();
    }
  }, [iframeLoaded]);

  const document = frameRef.current?.contentDocument;
  return (
    <React.Fragment>
      <Iframe onLoad={onLoad} ref={frameRef} title={`${name} demo`} {...other} />
      {iframeLoaded !== false
        ? ReactDOM.createPortal(
            <FramedDemo document={document} isJoy={isJoy} isolated={isolated}>
              {children}
            </FramedDemo>,
            document.body,
          )
        : null}
    </React.Fragment>
  );
}

DemoIframe.propTypes = {
  children: PropTypes.node.isRequired,
  isJoy: PropTypes.bool,
  isolated: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

function IsolatedDemo({ children, cssVarPrefix, colorSchemeNode, window }) {
  return React.cloneElement(children, {
    window,
    cssVarPrefix,
    colorSchemeNode: window ? window().document.documentElement : colorSchemeNode,
    colorSchemeSelector: 'class',
    documentNode: window ? window().document : undefined,
    disableNestedContext: true,
    storageManager: null,
  });
}

IsolatedDemo.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * The node to attach the selector. Ignored if `window` is provided.
   */
  colorSchemeNode: PropTypes.object,
  /**
   * The CSS variables prefix will be the name of the demo to avoid clashing with other demos
   * because the generated CSS variables are global (always contain `:root`).
   */
  cssVarPrefix: PropTypes.string,
  /**
   * Provided by `DemoIframe`.
   * If `window` is provided, the `colorSchemeNode` will be set to the html tag of the iframe.
   */
  window: PropTypes.func,
};

/**
 * Isolates the demo component as best as possible. Additional props are spread
 * to an `iframe` if `iframe={true}`.
 */
function DemoSandbox(props) {
  const { children, iframe = false, id, name, onResetDemoClick, isJoy, isolated, ...other } = props;
  const [injectTheme, setInjectTheme] = React.useState();
  const [root, setRoot] = React.useState();

  React.useEffect(() => {
    setRoot(document.getElementById(id));
  }, [id]);

  const t = useTranslate();

  useEnhancedEffect(() => {
    async function setupMaterialUITheme() {
      if (typeof window.getInjectTheme === 'function') {
        if (!globalInjectThemeCache) {
          window.React = React;
          const jsx = await import('react/jsx-runtime');
          window.jsx = jsx;
          globalInjectThemeCache = window.getInjectTheme();
        }
        setInjectTheme(globalInjectThemeCache);
      }
    }
    setupMaterialUITheme();
  }, []);

  return (
    <DemoErrorBoundary name={name} onResetDemoClick={onResetDemoClick} t={t}>
      {isolated ? (
        // Place ThemeProvider from MUI System here to disconnect the theme inheritance for Material UI and Joy UI
        // The demo will need to handle the ThemeProvider itself.
        <SystemThemeProvider
          theme={(upperTheme) => ({
            direction: upperTheme.direction, // required for internal ThemeProvider
            vars: upperTheme.vars, // required for styling Iframe
          })}
        >
          {iframe ? (
            <DemoIframe name={name} isJoy={isJoy} isolated={isolated} {...other}>
              {/* `children` needs to be a child of `DemoIframe` since the iframe implementation rely on `cloneElement`. */}
              {/* the `colorSchemeNode` will be provided by DemoIframe through `window` prop */}
              <IsolatedDemo cssVarPrefix={name}>{children}</IsolatedDemo>
            </DemoIframe>
          ) : (
            <IsolatedDemo cssVarPrefix={name} colorSchemeNode={root}>
              {children}
            </IsolatedDemo>
          )}
        </SystemThemeProvider>
      ) : (
        <DemoInstanceThemeProvider runtimeTheme={injectTheme}>
          {iframe ? (
            <DemoIframe name={name} isJoy={isJoy} {...other}>
              {/* `children` needs to be a child of `DemoIframe` since the iframe implementation rely on `cloneElement`. */}
              {children}
            </DemoIframe>
          ) : (
            children
          )}
        </DemoInstanceThemeProvider>
      )}
    </DemoErrorBoundary>
  );
}

DemoSandbox.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  iframe: PropTypes.bool,
  isJoy: PropTypes.bool,
  isolated: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onResetDemoClick: PropTypes.func.isRequired,
};

export default React.memo(DemoSandbox);
