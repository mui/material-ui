import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useRunner } from 'react-runner';
import { debounce } from '@mui/material/utils';
import { alpha, styled } from '@mui/material/styles';
import { styled as joyStyled } from '@mui/joy/styles';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import FormHelperText from '@mui/material/FormHelperText';
import NoSsr from '@mui/material/NoSsr';
import DemoSandboxed from 'docs/src/modules/components/DemoSandboxed';
import CodeEditor from 'docs/src/modules/components/CodeEditor';
import { AdCarbonInline } from 'docs/src/modules/components/AdCarbon';
import { useCodeVariant } from 'docs/src/modules/utils/codeVariant';
import { CODE_VARIANTS } from 'docs/src/modules/constants';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import BrandingProvider from 'docs/src/BrandingProvider';

const DemoToolbar = React.lazy(() => import('./DemoToolbar'));
// Sync with styles from DemoToolbar
// Importing the styles results in no bundle size reduction
const DemoToolbarFallbackRoot = styled('div')(({ theme }) => {
  return {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      height: theme.spacing(8),
    },
  };
});
export function DemoToolbarFallback() {
  const t = useTranslate();

  return <DemoToolbarFallbackRoot aria-busy aria-label={t('demoToolbarLabel')} role="toolbar" />;
}

function getDemoName(location) {
  return location.replace(/(.+?)(\w+)\.\w+$$/, '$2');
}

/**
 * Removes leading spaces (indentation) present in the `.tsx` previews
 * to be able to replace the existing code with the incoming dynamic code
 * @param {string} input
 */
function trimLeadingSpaces(input = '') {
  return input.replace(/^\s+/gm, '');
}

function useDemoData(codeVariant, demo, githubLocation) {
  const userLanguage = useUserLanguage();
  const router = useRouter();
  const asPathWithoutLang = router.asPath.replace(/^\/[a-zA-Z]{2}\//, '/');
  let product;
  let name = 'Material UI';
  if (asPathWithoutLang.startsWith('/joy-ui/')) {
    product = 'joy-ui';
    name = 'Joy UI';
  }
  if (asPathWithoutLang.startsWith('/base/')) {
    product = 'base';
    name = 'MUI Base';
  }
  if (asPathWithoutLang.startsWith('/x/')) {
    name = 'MUI X';
  }

  const title = `${getDemoName(githubLocation)} demo — ${name}`;
  if (codeVariant === CODE_VARIANTS.TS && demo.rawTS) {
    return {
      codeVariant: CODE_VARIANTS.TS,
      githubLocation: githubLocation.replace(/\.js$/, '.tsx'),
      language: userLanguage,
      raw: demo.rawTS,
      sourceLanguage: 'tsx',
      title,
      product,
    };
  }

  return {
    codeVariant: CODE_VARIANTS.JS,
    githubLocation,
    language: userLanguage,
    raw: demo.raw,
    sourceLanguage: 'jsx',
    title,
    product,
  };
}

// TODO: replace with React.useOpaqueReference if it is released
function useUniqueId(prefix) {
  // useOpaqueReference
  const [id, setId] = React.useState();
  React.useEffect(() => {
    setId(Math.random().toString(36).slice(2));
  }, []);

  return id ? `${prefix}${id}` : id;
}

const Root = styled('div')(({ theme }) => ({
  marginBottom: 24,
  marginLeft: theme.spacing(-2),
  marginRight: theme.spacing(-2),
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    marginRight: 0,
  },
}));

const DemoRootMaterial = styled('div', {
  shouldForwardProp: (prop) => prop !== 'hiddenToolbar' && prop !== 'bg',
})(({ theme, hiddenToolbar, bg }) => ({
  position: 'relative',
  outline: 0,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    borderRadius: 10,
    ...(bg === 'outlined' && {
      borderLeftWidth: 1,
      borderRightWidth: 1,
    }),
    /* Make no difference between the demo and the markdown. */
    ...(bg === 'inline' && {
      padding: theme.spacing(0),
    }),
    ...(hiddenToolbar && {
      paddingTop: theme.spacing(1),
    }),
  },
  /* Isolate the demo with an outline. */
  ...(bg === 'outlined' && {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${alpha(theme.palette.action.active, 0.1)}`,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  }),
  /* Prepare the background to display an inner elevation. */
  ...(bg === true && {
    padding: theme.spacing(3),
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
  }),
  ...(hiddenToolbar && {
    paddingTop: theme.spacing(2),
  }),
}));

const DemoRootJoy = joyStyled('div', {
  shouldForwardProp: (prop) => prop !== 'hiddenToolbar' && prop !== 'bg',
})(({ theme, hiddenToolbar, bg }) => ({
  position: 'relative',
  outline: 0,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    borderRadius: 10,
    ...(bg === 'outlined' && {
      borderLeftWidth: 1,
      borderRightWidth: 1,
    }),
    /* Make no difference between the demo and the markdown. */
    ...(bg === 'inline' && {
      padding: theme.spacing(0),
    }),
    ...(hiddenToolbar && {
      paddingTop: theme.spacing(1),
    }),
  },
  /* Isolate the demo with an outline. */
  ...(bg === 'outlined' && {
    padding: theme.spacing(3),
    backgroundColor: theme.vars.palette.background.surface,
    border: `1px solid`,
    borderColor: theme.vars.palette.divider,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  }),
  /* Prepare the background to display an inner elevation. */
  ...(bg === true && {
    padding: theme.spacing(3),
    backgroundColor: theme.vars.palette.background.level2,
  }),
  ...(hiddenToolbar && {
    paddingTop: theme.spacing(3),
  }),
}));

const AnchorLink = styled('div')({
  marginTop: -64, // height of toolbar
  position: 'absolute',
});

const InitialFocus = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: theme.spacing(4),
  height: theme.spacing(4),
  pointerEvents: 'none',
}));
export default function Demo(props) {
  const router = useRouter();
  const asPathWithoutLang = router.asPath.replace(/^\/[a-zA-Z]{2}\//, '/');
  const { demo, demoOptions, disableAd, githubLocation, mode } = props;
  const t = useTranslate();
  const codeVariant = useCodeVariant();
  const demoData = useDemoData(codeVariant, demo, githubLocation);

  const [demoHovered, setDemoHovered] = React.useState(false);
  const handleDemoHover = (event) => {
    setDemoHovered(event.type === 'mouseenter');
  };

  const demoName = getDemoName(demoData.githubLocation);
  const demoSandboxedStyle = React.useMemo(
    () => ({
      maxWidth: demoOptions.maxWidth,
      height: demoOptions.height,
    }),
    [demoOptions.height, demoOptions.maxWidth],
  );

  if (demoOptions.bg == null) {
    demoOptions.bg = 'outlined';
  }

  if (demoOptions.iframe) {
    demoOptions.bg = true;
  }

  const [codeOpen, setCodeOpen] = React.useState(demoOptions.defaultCodeOpen || false);
  const shownOnce = React.useRef(false);
  if (codeOpen) {
    shownOnce.current = true;
  }

  React.useEffect(() => {
    const navigatedDemoName = getDemoName(window.location.hash);
    if (demoName === navigatedDemoName) {
      setCodeOpen(true);
    }
  }, [demoName]);

  const showPreview =
    !demoOptions.hideToolbar && demoOptions.defaultCodeOpen !== false && Boolean(demo.jsxPreview);

  const [demoKey, setDemoKey] = React.useReducer((key) => key + 1, 0);

  const demoId = useUniqueId('demo-');
  const demoSourceId = useUniqueId(`demoSource-`);
  const openDemoSource = codeOpen || showPreview;

  const initialFocusRef = React.useRef(null);

  const [showAd, setShowAd] = React.useState(false);

  const usePreview = showPreview && !codeOpen;
  const initialCode = usePreview ? demo.jsxPreview : demoData.raw;
  const [code, setCode] = React.useState(initialCode);
  const resetDemo = React.useCallback(() => {
    setCode(initialCode);
    setDemoKey();
  }, [initialCode]);
  React.useEffect(() => {
    resetDemo();
  }, [resetDemo]);

  const { element, error } = useRunner({
    code: usePreview
      ? trimLeadingSpaces(demoData.raw).replace(trimLeadingSpaces(demo.jsxPreview), code)
      : code,
    scope: demo.scope,
  });
  const [debouncedError, setError] = React.useState(error);
  const debouncedSetError = React.useMemo(() => debounce(setError, 300), []);
  React.useEffect(() => {
    debouncedSetError(error);
  }, [error, debouncedSetError]);

  const isJoy = asPathWithoutLang.startsWith('/joy-ui');
  const DemoRoot = asPathWithoutLang.startsWith('/joy-ui') ? DemoRootJoy : DemoRootMaterial;
  const Wrapper = asPathWithoutLang.startsWith('/joy-ui') ? BrandingProvider : React.Fragment;

  return (
    <Root>
      <AnchorLink id={`${demoName}`} />
      <DemoRoot
        hiddenToolbar={demoOptions.hideToolbar}
        bg={demoOptions.bg}
        id={demoId}
        onMouseEnter={handleDemoHover}
        onMouseLeave={handleDemoHover}
      >
        <Wrapper {...(isJoy && { mode })}>
          <InitialFocus
            aria-label={t('initialFocusLabel')}
            action={initialFocusRef}
            tabIndex={-1}
          />
        </Wrapper>
        <DemoSandboxed
          key={demoKey}
          style={demoSandboxedStyle}
          iframe={demoOptions.iframe}
          name={demoName}
          onResetDemoClick={resetDemo}
        >
          {element}
        </DemoSandboxed>
      </DemoRoot>
      <AnchorLink id={`${demoName}.js`} />
      <AnchorLink id={`${demoName}.tsx`} />
      <Wrapper {...(isJoy && { mode })}>
        {demoOptions.hideToolbar ? null : (
          <NoSsr defer fallback={<DemoToolbarFallback />}>
            <React.Suspense fallback={<DemoToolbarFallback />}>
              <DemoToolbar
                codeOpen={codeOpen}
                codeVariant={codeVariant}
                demo={demo}
                demoData={demoData}
                demoHovered={demoHovered}
                demoId={demoId}
                demoName={demoName}
                demoOptions={demoOptions}
                demoSourceId={demoSourceId}
                initialFocusRef={initialFocusRef}
                onCodeOpenChange={() => {
                  setCodeOpen((open) => !open);
                  setShowAd(true);
                }}
                onResetDemoClick={resetDemo}
                openDemoSource={openDemoSource}
                showPreview={showPreview}
              />
            </React.Suspense>
          </NoSsr>
        )}
        <Collapse in={openDemoSource} unmountOnExit>
          <CodeEditor
            key={demoKey}
            id={demoSourceId}
            value={code}
            onChange={setCode}
            language={demoData.sourceLanguage}
          />
          {debouncedError && error && (
            <FormHelperText
              variant="outlined"
              error
              component="pre"
              sx={{ whiteSpace: 'pre-wrap', mb: 1 }}
            >
              {debouncedError}
            </FormHelperText>
          )}
        </Collapse>
        {showAd && !disableAd && !demoOptions.disableAd ? <AdCarbonInline /> : null}
      </Wrapper>
    </Root>
  );
}

Demo.propTypes = {
  demo: PropTypes.object.isRequired,
  demoOptions: PropTypes.object.isRequired,
  disableAd: PropTypes.bool.isRequired,
  githubLocation: PropTypes.string.isRequired,
  mode: PropTypes.string, // temporary, just to make Joy docs work.
};
