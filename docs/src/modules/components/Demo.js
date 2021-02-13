import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
// import * as TS from 'typescript';
import { Error, Preview, Provider } from 'jarle';
import { alpha, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import NoSsr from '@material-ui/core/NoSsr';
import { CODE_VARIANTS } from 'docs/src/modules/constants';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import { AdCarbonInline } from 'docs/src/modules/components/AdCarbon';
import getJsxPreview from 'docs/src/modules/utils/getJsxPreview';
import DemoEditor from './DemoEditor';

const DemoToolbar = React.lazy(() => import('./DemoToolbar'));

// Sync with styles from DemoToolbar
// Importing the styles results in no bundle size reduction
const useDemoToolbarFallbackStyles = makeStyles(
  (theme) => {
    return {
      root: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
          height: 48,
        },
      },
    };
  },
  { name: 'DemoToolbar' },
);

export function DemoToolbarFallback() {
  const classes = useDemoToolbarFallbackStyles();
  const t = useTranslate();

  return (
    <div aria-busy aria-label={t('demoToolbarLabel')} className={classes.root} role="toolbar" />
  );
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
      raw: demo.rawTS.trim(),
      imports: demo.imports,
      sourceLanguage: 'tsx',
      title,
    };
  }
  return {
    codeVariant: CODE_VARIANTS.JS,
    githubLocation,
    language: userLanguage,
    raw: demo.raw.trim(),
    imports: demo.imports,
    sourceLanguage: 'jsx',
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

const useStyles = makeStyles(
  (theme) => ({
    root: {
      marginBottom: 40,
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0, 1),
        marginLeft: 0,
        marginRight: 0,
      },
    },
    demo: {
      position: 'relative',
      outline: 0,
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.up('sm')]: {
        borderRadius: theme.shape.borderRadius,
      },
    },
    /* Isolate the demo with an outline. */
    demoBgOutlined: {
      padding: theme.spacing(3),
      border: `1px solid ${alpha(theme.palette.action.active, 0.12)}`,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      [theme.breakpoints.up('sm')]: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
      },
    },
    /* Prepare the background to display an inner elevation. */
    demoBgTrue: {
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.level2,
    },
    /* Make no difference between the demo and the markdown. */
    demoBgInline: {
      // Maintain alignment with the markdown text
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
      },
    },
    demoHiddenToolbar: {
      paddingTop: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(3),
      },
    },
    anchorLink: {
      marginTop: -64, // height of toolbar
      position: 'absolute',
    },
    initialFocus: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: theme.spacing(4),
      height: theme.spacing(4),
      pointerEvents: 'none',
    },
    preview: {
      width: '100%',
    },
  }),
  { name: 'Demo' },
);

export default function Demo(props) {
  const { demo, demoOptions, disableAd, githubLocation } = props;
  const classes = useStyles();
  const t = useTranslate();
  const codeVariant = useSelector((state) => state.options.codeVariant);
  const demoData = useDemoData(codeVariant, demo, githubLocation);

  const [demoHovered, setDemoHovered] = React.useState(false);
  const handleDemoHover = (event) => {
    setDemoHovered(event.type === 'mouseenter');
  };

  const demoName = getDemoName(demoData.githubLocation);

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

  const [jsx, fullJsx] = getJsxPreview(demoData.raw || '');
  const showPreview =
    !demoOptions.hideToolbar &&
    demoOptions.defaultCodeOpen !== false &&
    jsx !== demoData.raw &&
    jsx.split(/\n/).length <= 17;

  const [renderValue, setRenderValue] = React.useState(demoData.raw);
  const [demoJS, setDemoJS] = React.useState('');
  React.useEffect(() => {
    import('typescript').then((typescript) => {
      setDemoJS(
        typescript.transpile(renderValue, {
          target: 'es6',
          jsx: true,
        }),
      );
    });
  }, [renderValue]);

  const [editorValue, setEditorValue] = React.useState(codeOpen ? demoData.raw : jsx);
  const handleEditorChange = (value) => {
    setEditorValue(value);
    setRenderValue(codeOpen ? value : demoData.raw.replace(fullJsx, value));
  };

  // Update editor when variant changes
  React.useEffect(() => {
    setEditorValue(codeOpen ? demoData.raw : jsx);
  }, [codeOpen, codeVariant, demoData.raw, jsx, showPreview]);

  const [showAd, setShowAd] = React.useState(false);
  const handleCodeOpenChange = () => {
    setCodeOpen((open) => !open);
    setShowAd(true);
  };

  const [demoKey, resetDemo] = React.useReducer((key) => key + 1, 0);
  const handleResetDemo = () => {
    resetDemo();
    setEditorValue(codeOpen ? demoData.raw : jsx);
  };

  const demoId = useUniqueId('demo-');
  const demoSourceId = useUniqueId(`demoSource-`);
  const openDemoSource = codeOpen || showPreview;
  const initialFocusRef = React.useRef(null);

  return (
    <div className={classes.root}>
      <div
        className={clsx(classes.demo, {
          [classes.demoHiddenToolbar]: demoOptions.hideToolbar,
          [classes.demoBgOutlined]: demoOptions.bg === 'outlined',
          [classes.demoBgTrue]: demoOptions.bg === true,
          [classes.demoBgInline]: demoOptions.bg === 'inline',
        })}
        id={demoId}
        onMouseEnter={handleDemoHover}
        onMouseLeave={handleDemoHover}
      >
        <IconButton
          aria-label={t('initialFocusLabel')}
          className={classes.initialFocus}
          action={initialFocusRef}
          tabIndex={-1}
        />
        <Provider code={demoJS} resolveImports={() => demoData.imports}>
          <Preview key={demoKey} className={classes.preview} />
          <Error />
        </Provider>
      </div>
      <div className={classes.anchorLink} id={`${demoName}.js`} />
      <div className={classes.anchorLink} id={`${demoName}.tsx`} />
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
              onCodeOpenChange={handleCodeOpenChange}
              onResetDemoClick={handleResetDemo}
              openDemoSource={openDemoSource}
              showPreview={showPreview}
            />
          </React.Suspense>
        </NoSsr>
      )}
      <Collapse in={openDemoSource} unmountOnExit>
        <DemoEditor value={editorValue} onChange={handleEditorChange} />
      </Collapse>
      {showAd && !disableAd && !demoOptions.disableAd ? <AdCarbonInline /> : null}
    </div>
  );
}

Demo.propTypes = {
  demo: PropTypes.object.isRequired,
  demoOptions: PropTypes.object.isRequired,
  disableAd: PropTypes.bool.isRequired,
  githubLocation: PropTypes.string.isRequired,
};
