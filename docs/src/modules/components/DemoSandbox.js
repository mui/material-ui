import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { StyleSheetManager } from 'styled-components';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import { CssVarsProvider, extendTheme, useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import {
  createTheme,
  useTheme,
  styled,
  useColorScheme as useMuiColorScheme,
} from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import DemoErrorBoundary from 'docs/src/modules/components/DemoErrorBoundary';
import { useTranslate } from '@mui/docs/i18n';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { DemoInstanceThemeProvider } from 'docs/src/theming';
import { ThemeOptionsContext } from 'docs/src/modules/components/ThemeContext';

let globalInjectThemeCache;

function JoyIframeObserver({ document }) {
  const { mode, systemMode } = useJoyColorScheme();
  React.useEffect(() => {
    document.documentElement.setAttribute('data-joy-color-scheme', systemMode || mode);
  }, [document, mode, systemMode]);
  return null;
}
JoyIframeObserver.propTypes = {
  document: PropTypes.object.isRequired,
};

function FramedDemo(props) {
  const { children, document, isJoy } = props;
  const themeOptions = React.useContext(ThemeOptionsContext);

  const theme = useTheme();
  React.useEffect(() => {
    document.body.setAttribute('dir', theme.direction);
  }, [document, theme.direction]);

  React.useEffect(() => {
    document.documentElement.style.colorScheme = themeOptions.paletteMode;
    document.documentElement.setAttribute('data-mui-color-scheme', themeOptions.paletteMode);
  }, [document, themeOptions.paletteMode, isJoy]);

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
    return isJoy
      ? extendTheme()
      : createTheme({
          colorSchemes: { light: true, dark: true },
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
          },
        });
  }, [isJoy]);

  return (
    <StyleSheetManager
      target={document.head}
      stylisPlugins={theme.direction === 'rtl' ? [rtlPlugin] : []}
    >
      <CacheProvider value={cache}>
        <GlobalStyles styles={iframeTheme.generateStyleSheets?.() || []} />
        {React.cloneElement(children, {
          window: getWindow,
        })}
        {isJoy && <JoyIframeObserver document={document} />}
      </CacheProvider>
    </StyleSheetManager>
  );
}
FramedDemo.propTypes = {
  children: PropTypes.node,
  document: PropTypes.object.isRequired,
  isJoy: PropTypes.bool,
};

const Iframe = styled('iframe')(({ theme }) => ({
  backgroundColor: (theme.vars || theme).palette.background.default,
  flexGrow: 1,
  height: 400,
  border: 0,
}));

function DemoIframe(props) {
  const { children, name, isJoy, ...other } = props;
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
            <FramedDemo document={document} isJoy={isJoy}>
              {React.cloneElement(children, { root: document?.documentElement })}
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
  name: PropTypes.string.isRequired,
};

function IsolatedDemo({ root, children }) {
  return (
    <SystemThemeProvider
      theme={(upperTheme) => ({
        direction: upperTheme.direction,
      })}
    >
      {React.cloneElement(children, {
        disableNestedContext: true,
        storageManager: null,
        colorSchemeNode: root,
      })}
    </SystemThemeProvider>
  );
}

/**
 * Isolates the demo component as best as possible. Additional props are spread
 * to an `iframe` if `iframe={true}`.
 */
function DemoSandbox(props) {
  const {
    children: childrenProp,
    iframe = false,
    id,
    name,
    onResetDemoClick,
    isJoy,
    isolated,
    ...other
  } = props;
  const [injectTheme, setInjectTheme] = React.useState();
  const { mode } = useMuiColorScheme();
  const [root, setRoot] = React.useState();
  const Sandbox = iframe ? DemoIframe : React.Fragment;
  const sandboxProps = iframe ? { name, isJoy, ...other } : {};

  React.useEffect(() => {
    setRoot(document.getElementById(id));
  }, []);

  const t = useTranslate();

  // `childrenProp` needs to be a child of `Sandbox` since the iframe implementation rely on `cloneElement`.
  const children = (
    <Sandbox {...sandboxProps}>
      {isolated ? (
        <IsolatedDemo root={root}>
          {React.cloneElement(childrenProp, {
            disableNestedContext: true,
            storageManager: null,
            defaultMode: mode, // The default mode comes from `BrandingCssVarsProvider` at page level.
          })}
        </IsolatedDemo>
      ) : (
        childrenProp
      )}
    </Sandbox>
  );

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
      <DemoInstanceThemeProvider runtimeTheme={injectTheme}>{children}</DemoInstanceThemeProvider>
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
