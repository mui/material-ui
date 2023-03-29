import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { create } from 'jss';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import rtlPluginSc from 'stylis-plugin-rtl-sc';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { StyleSheetManager } from 'styled-components';
import { jssPreset, StylesProvider } from '@mui/styles';
import { useTheme, styled, createTheme, ThemeProvider } from '@mui/material/styles';
import rtl from 'jss-rtl';
import DemoErrorBoundary from 'docs/src/modules/components/DemoErrorBoundary';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import { getDesignTokens } from 'docs/src/modules/brandingTheme';
import { highDensity } from 'docs/src/modules/components/ThemeContext';

function FramedDemo(props) {
  const { children, document } = props;

  const theme = useTheme();
  React.useEffect(() => {
    document.body.dir = theme.direction;
  }, [document, theme.direction]);

  const { jss, sheetsManager } = React.useMemo(() => {
    return {
      jss: create({
        plugins: [...jssPreset().plugins, rtl()],
        insertionPoint: document.head,
      }),
      sheetsManager: new Map(),
    };
  }, [document]);

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

  return (
    <StylesProvider jss={jss} sheetsManager={sheetsManager}>
      <StyleSheetManager
        target={document.head}
        stylisPlugins={theme.direction === 'rtl' ? [rtlPluginSc] : []}
      >
        <CacheProvider value={cache}>
          {React.cloneElement(children, {
            window: getWindow,
          })}
        </CacheProvider>
      </StyleSheetManager>
    </StylesProvider>
  );
}
FramedDemo.propTypes = {
  children: PropTypes.node,
  document: PropTypes.object.isRequired,
};

const Iframe = styled('iframe')(({ theme }) => ({
  backgroundColor: (theme.vars || theme).palette.background.default,
  flexGrow: 1,
  height: 400,
  border: 0,
  boxShadow: (theme.vars || theme).shadows[1],
}));

function DemoIframe(props) {
  const { children, name, ...other } = props;
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
            <FramedDemo document={document}>{children}</FramedDemo>,
            document.body,
          )
        : null}
    </React.Fragment>
  );
}

DemoIframe.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

// Use the default MUI theme for the demos
function getTheme(outerTheme) {
  const brandingDesignTokens = getDesignTokens(outerTheme.palette.mode);
  const isCustomized =
    outerTheme.palette.primary?.main &&
    outerTheme.palette.primary.main !== brandingDesignTokens.palette.primary.main;
  const resultTheme = createTheme(
    {
      palette: {
        mode: outerTheme.palette.mode || 'light',
        ...(isCustomized && {
          // Apply color from the color playground
          primary: { main: outerTheme.palette.primary.main },
          secondary: { main: outerTheme.palette.secondary.main },
        }),
      },
    },
    // To make DensityTool playground works
    // check from MuiFormControl because brandingTheme does not customize this component
    outerTheme.components?.MuiFormControl?.defaultProps?.margin === 'dense' ? highDensity : {},
  );
  if (outerTheme.direction) {
    resultTheme.direction = outerTheme.direction;
  }
  if (outerTheme.spacing) {
    resultTheme.spacing = outerTheme.spacing;
  }
  return resultTheme;
}

// TODO: Let demos decide whether they need JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
  insertionPoint:
    typeof window !== 'undefined' ? document.querySelector('#insertion-point-jss') : null,
});

/**
 * Isolates the demo component as best as possible. Additional props are spread
 * to an `iframe` if `iframe={true}`.
 */
function DemoSandbox(props) {
  const router = useRouter();
  const { canonicalAs } = pathnameToLanguage(router.asPath);
  const { children: childrenProp, iframe = false, name, onResetDemoClick, ...other } = props;
  const Sandbox = iframe ? DemoIframe : React.Fragment;
  const sandboxProps = iframe ? { name, ...other } : {};

  const t = useTranslate();

  // `childrenProp` needs to be a child of `Sandbox` since the iframe implementation rely on `cloneElement`.
  const children = <Sandbox {...sandboxProps}>{childrenProp}</Sandbox>;

  return (
    <DemoErrorBoundary name={name} onResetDemoClick={onResetDemoClick} t={t}>
      {canonicalAs.startsWith('/joy-ui/') ? (
        children
      ) : (
        <StylesProvider jss={jss}>
          <ThemeProvider theme={(outerTheme) => getTheme(outerTheme)}>{children}</ThemeProvider>
        </StylesProvider>
      )}
    </DemoErrorBoundary>
  );
}

DemoSandbox.propTypes = {
  children: PropTypes.node.isRequired,
  iframe: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onResetDemoClick: PropTypes.func.isRequired,
};

export default React.memo(DemoSandbox);
