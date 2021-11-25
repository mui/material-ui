import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import NoSsr from '@mui/material/NoSsr';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import DemoSandboxed from 'docs/src/modules/components/DemoSandboxed';
import { AdCarbonInline } from 'docs/src/modules/components/AdCarbon';
import { useCodeVariant } from 'docs/src/modules/utils/codeVariant';
import { CODE_VARIANTS } from 'docs/src/modules/constants';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import { load, dynamicWithFallbackProps } from 'docs/src/modules/utils/useDynamicWithFallback';

const EditableDemoPreview = dynamicWithFallbackProps(
  () => load('DemoEditable', 'EditableDemoPreview'),
  {
    loading: ({ props }) => props.fallback,
  },
);

const EditableDemoEditor = dynamicWithFallbackProps(
  async () => load('DemoEditable', 'EditableDemoEditor'),
  {
    loading: ({ props }) => props.fallback,
  },
);

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

/**
 * Removes leading spaces (indentation) present in the `.tsx` previews
 * to be able to replace the existing code with the incoming dynamic code
 * @param {string} input
 */

function trimLeadingSpaces(input) {
  if (!input) {
    return undefined;
  }
  return input
    .split('\n')
    .map((line) => line.trim())
    .join('\n');
}

function getDemoName(location) {
  return location.replace(/(.+?)(\w+)\.\w+$$/, '$2');
}

function useDemoData(codeVariant, demo, githubLocation) {
  const userLanguage = useUserLanguage();
  const title = `${getDemoName(githubLocation)} Material Demo`;
  if (codeVariant === CODE_VARIANTS.TS && demo.rawTS) {
    return {
      codeVariant: CODE_VARIANTS.TS,
      githubLocation: githubLocation.replace(/\.js$/, '.tsx'),
      language: userLanguage,
      raw: demo.rawTS,
      Component: demo.tsx,
      sourceLanguage: 'tsx',
      trimmed: {
        raw: trimLeadingSpaces(demo.rawTS),
        preview: trimLeadingSpaces(demo.jsxPreview),
      },
      title,
    };
  }

  return {
    codeVariant: CODE_VARIANTS.JS,
    githubLocation,
    language: userLanguage,
    raw: demo.raw,
    Component: demo.js,
    sourceLanguage: 'jsx',
    trimmed: {
      raw: trimLeadingSpaces(demo.raw),
      preview: trimLeadingSpaces(demo.jsxPreview),
    },
    title,
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
  marginBottom: 40,
  marginLeft: theme.spacing(-2),
  marginRight: theme.spacing(-2),
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    marginRight: 0,
  },
}));

const DemoRoot = styled('div', {
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
      padding: theme.spacing(3),
    }),
    ...(hiddenToolbar && {
      paddingTop: theme.spacing(3),
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

const Code = styled(HighlightedCode)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(0),
  },
  '& pre': {
    margin: '0 auto',
    maxHeight: 'min(68vh, 1000px)',
  },
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
  const { demo, demoOptions, disableAd, githubLocation, resolveDemoImports } = props;
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

  const [isEditing, setIsEditing] = React.useState(false);

  const showPreview =
    !demoOptions.hideToolbar && demoOptions.defaultCodeOpen !== false && Boolean(demo.jsxPreview);

  const [demoKey, resetDemo] = React.useReducer((key) => key + 1, 0);

  const demoId = useUniqueId('demo-');
  const demoSourceId = useUniqueId(`demoSource-`);
  const openDemoSource = codeOpen || showPreview;

  const initialFocusRef = React.useRef(null);

  const [showAd, setShowAd] = React.useState(false);

  const [editorValue, setEditorValue] = React.useState(codeOpen ? demoData.raw : demo.jsxPreview);
  const [dynamicCode, setDynamicCode] = React.useState(demoData.raw);
  const handleStartEditing = React.useCallback(() => setIsEditing(true), []);
  const handleEditorChange = React.useCallback(
    (value) => {
      setEditorValue(value);
      setDynamicCode(
        codeOpen ? value : demoData.trimmed.raw.replace(demoData.trimmed.preview, value),
      );
    },
    [codeOpen, demoData.trimmed.raw, demoData.trimmed.preview],
  );
  const handleResetDemoClick = React.useCallback(() => {
    resetDemo();
    handleEditorChange(codeOpen ? demoData.raw : demo.jsxPreview);
  }, [codeOpen, handleEditorChange, demoData.raw, demo.jsxPreview]);

  React.useEffect(() => {
    handleEditorChange(codeOpen ? demoData.raw : demo.jsxPreview);
  }, [codeOpen, handleEditorChange, demoData.raw, demo.jsxPreview]);

  const DemoComponent = React.useMemo(
    () =>
      isEditing
        ? () => (
            <EditableDemoPreview
              resolveDemoImports={resolveDemoImports}
              code={dynamicCode}
              key={demoKey}
              language={demoData.sourceLanguage}
              fallback={<demoData.Component />}
            />
          )
        : demoData.Component,
    [isEditing, dynamicCode, demoKey, resolveDemoImports, demoData],
  );

  const staticPreview = (
    <Code
      id={demoSourceId}
      code={showPreview && !codeOpen ? demo.jsxPreview : demoData.raw}
      language={demoData.sourceLanguage}
      onClick={handleStartEditing}
      onFocus={handleStartEditing}
      tabIndex={0}
    />
  );

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
        <InitialFocus aria-label={t('initialFocusLabel')} action={initialFocusRef} tabIndex={-1} />
        <DemoSandboxed
          demoKey={demoKey}
          style={demoSandboxedStyle}
          component={DemoComponent}
          iframe={demoOptions.iframe}
          name={demoName}
          onResetDemoClick={resetDemo}
        />
      </DemoRoot>
      <AnchorLink id={`${demoName}.js`} />
      <AnchorLink id={`${demoName}.tsx`} />
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
              onResetDemoClick={handleResetDemoClick}
              openDemoSource={openDemoSource}
              showPreview={showPreview}
            />
          </React.Suspense>
        </NoSsr>
      )}
      <Collapse in={openDemoSource} unmountOnExit>
        {isEditing ? (
          <EditableDemoEditor
            language={demoData.sourceLanguage}
            onChange={handleEditorChange}
            code={editorValue}
            fallback={staticPreview}
          />
        ) : (
          staticPreview
        )}
      </Collapse>
      {showAd && !disableAd && !demoOptions.disableAd ? <AdCarbonInline /> : null}
    </Root>
  );
}

Demo.propTypes = {
  demo: PropTypes.object.isRequired,
  demoOptions: PropTypes.object.isRequired,
  disableAd: PropTypes.bool.isRequired,
  githubLocation: PropTypes.string.isRequired,
  resolveDemoImports: PropTypes.func,
};
