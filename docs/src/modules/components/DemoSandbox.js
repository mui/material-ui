import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { StyleSheetManager } from 'styled-components';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { useTheme, styled } from '@mui/material/styles';
import DemoErrorBoundary from 'docs/src/modules/components/DemoErrorBoundary';
import { useTranslate } from '@mui/docs/i18n';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { DemoInstanceThemeProvider } from 'docs/src/theming';
import { ThemeOptionsContext } from 'docs/src/modules/components/ThemeContext';

const iframeDefaultJoyTheme = extendTheme({
  cssVarPrefix: 'demo-iframe',
});

let globalInjectThemeCache;

function FramedDemo(props) {
  const { children, document, usesCssVarsTheme } = props;
  const themeOptions = React.useContext(ThemeOptionsContext);

  const theme = useTheme();
  React.useEffect(() => {
    document.body.setAttribute('dir', theme.direction);
  }, [document, theme.direction]);

  React.useEffect(() => {
    document.documentElement.style.colorScheme = themeOptions.paletteMode;
  }, [document, themeOptions.paletteMode]);

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

  const Wrapper = usesCssVarsTheme ? CssVarsProvider : React.Fragment;
  const wrapperProps = usesCssVarsTheme
    ? {
        documentNode: document,
        colorSchemeNode: document.documentElement,
        theme: iframeDefaultJoyTheme,
      }
    : {};

  return (
    <StyleSheetManager
      target={document.head}
      stylisPlugins={theme.direction === 'rtl' ? [rtlPlugin] : []}
    >
      <CacheProvider value={cache}>
        <Wrapper {...wrapperProps}>
          {React.cloneElement(children, {
            window: getWindow,
          })}
        </Wrapper>
      </CacheProvider>
    </StyleSheetManager>
  );
}
FramedDemo.propTypes = {
  children: PropTypes.node,
  document: PropTypes.object.isRequired,
  usesCssVarsTheme: PropTypes.bool,
};

const Iframe = styled('iframe')(({ theme }) => ({
  backgroundColor: (theme.vars || theme).palette.background.default,
  flexGrow: 1,
  height: 400,
  border: 0,
  boxShadow: (theme.vars || theme)?.shadows?.[1],
}));

function DemoIframe(props) {
  const { children, name, usesCssVarsTheme, ...other } = props;
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
            <FramedDemo document={document} usesCssVarsTheme={usesCssVarsTheme}>
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
  name: PropTypes.string.isRequired,
  usesCssVarsTheme: PropTypes.bool,
};

/**
 * Isolates the demo component as best as possible. Additional props are spread
 * to an `iframe` if `iframe={true}`.
 */
function DemoSandbox(props) {
  const {
    children: childrenProp,
    iframe = false,
    name,
    onResetDemoClick,
    usesCssVarsTheme,
    ...other
  } = props;
  const [injectTheme, setInjectTheme] = React.useState();
  const Sandbox = iframe ? DemoIframe : React.Fragment;
  const sandboxProps = iframe ? { name, usesCssVarsTheme, ...other } : {};

  const t = useTranslate();

  // `childrenProp` needs to be a child of `Sandbox` since the iframe implementation rely on `cloneElement`.
  const children = <Sandbox {...sandboxProps}>{childrenProp}</Sandbox>;

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
      {usesCssVarsTheme ? (
        children
      ) : (
        <DemoInstanceThemeProvider runtimeTheme={injectTheme}>{children}</DemoInstanceThemeProvider>
      )}
    </DemoErrorBoundary>
  );
}

DemoSandbox.propTypes = {
  children: PropTypes.node.isRequired,
  iframe: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onResetDemoClick: PropTypes.func.isRequired,
  usesCssVarsTheme: PropTypes.bool,
};

export default React.memo(DemoSandbox);
