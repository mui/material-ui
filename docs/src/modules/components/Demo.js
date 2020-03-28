import React from 'react';
import LZString from 'lz-string';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import copy from 'clipboard-copy';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, fade } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Collapse from '@material-ui/core/Collapse';
import NoSsr from '@material-ui/core/NoSsr';
import EditIcon from '@material-ui/icons/Edit';
import CodeIcon from '@material-ui/icons/Code';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import DemoSandboxed from 'docs/src/modules/components/DemoSandboxed';
import DemoLanguages from 'docs/src/modules/components/DemoLanguages';
import getDemoConfig from 'docs/src/modules/utils/getDemoConfig';
import getJsxPreview from 'docs/src/modules/utils/getJsxPreview';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { ACTION_TYPES, CODE_VARIANTS } from 'docs/src/modules/constants';

function compress(object) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

function addHiddenInput(form, name, value) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

const styles = (theme) => ({
  root: {
    marginBottom: 40,
    marginLeft: -theme.spacing(2),
    marginRight: -theme.spacing(2),
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
    border: `1px solid ${fade(theme.palette.action.active, 0.12)}`,
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
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3),
    },
  },
  demoHiddenToolbar: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3),
    },
  },
  toolbar: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flip: false,
      top: 0,
      right: theme.spacing(1),
      height: theme.spacing(6),
    },
    justifyContent: 'space-between',
  },
  code: {
    display: 'none',
    padding: 0,
    marginBottom: theme.spacing(1),
    marginRight: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '& pre': {
      overflow: 'auto',
      lineHeight: 1.5,
      margin: '0px !important',
      maxHeight: 1000,
    },
  },
  tooltip: {
    zIndex: theme.zIndex.appBar - 1,
  },
  anchorLink: {
    marginTop: -64, // height of toolbar
    position: 'absolute',
  },
});

function getDemoName(location) {
  return location.replace(/(.+?)(\w+)\.\w+$$/, '$2');
}

function getDemoData(codeVariant, demo, githubLocation) {
  if (codeVariant === CODE_VARIANTS.TS && demo.rawTS) {
    return {
      codeVariant: CODE_VARIANTS.TS,
      githubLocation: githubLocation.replace(/\.js$/, '.tsx'),
      raw: demo.rawTS,
      Component: demo.tsx,
      sourceLanguage: 'tsx',
    };
  }

  return {
    codeVariant: CODE_VARIANTS.JS,
    githubLocation,
    raw: demo.raw,
    Component: demo.js,
    sourceLanguage: 'jsx',
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

function Demo(props) {
  const { classes, demo, demoOptions, githubLocation } = props;
  const dispatch = useDispatch();
  const t = useSelector((state) => state.options.t);
  const codeVariant = useSelector((state) => state.options.codeVariant);
  const demoData = getDemoData(codeVariant, demo, githubLocation);

  const [sourceHintSeen, setSourceHintSeen] = React.useState(false);
  React.useEffect(() => {
    setSourceHintSeen(getCookie('sourceHintSeen'));
  }, []);

  const [demoHovered, setDemoHovered] = React.useState(false);
  const handleDemoHover = (event) => {
    setDemoHovered(event.type === 'mouseenter');
  };

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(undefined);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCodeLanguageClick = (event, clickedCodeVariant) => {
    if (codeVariant !== clickedCodeVariant) {
      dispatch({
        type: ACTION_TYPES.OPTIONS_CHANGE,
        payload: {
          codeVariant: clickedCodeVariant,
        },
      });
    }
  };

  const handleCodeSandboxClick = () => {
    const demoConfig = getDemoConfig(demoData);
    const parameters = compress({
      files: {
        'package.json': {
          content: {
            title: demoConfig.title,
            description: demoConfig.description,
            dependencies: demoConfig.dependencies,
            devDependencies: {
              'react-scripts': 'latest',
              ...demoConfig.devDependencies,
            },
            main: demoConfig.main,
            scripts: demoConfig.scripts,
          },
        },
        ...Object.keys(demoConfig.files).reduce((files, name) => {
          files[name] = { content: demoConfig.files[name] };
          return files;
        }, {}),
      },
    });

    const form = document.createElement('form');
    form.method = 'POST';
    form.target = '_blank';
    form.action = 'https://codeSandbox.io/api/v1/sandboxes/define';
    addHiddenInput(form, 'parameters', parameters);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleCopyClick = async () => {
    try {
      await copy(demoData.raw);
      setSnackbarMessage(t('copiedSource'));
      setSnackbarOpen(true);
    } finally {
      handleMoreClose();
    }
  };

  const handleStackBlitzClick = () => {
    const demoConfig = getDemoConfig(demoData);
    const form = document.createElement('form');
    form.method = 'POST';
    form.target = '_blank';
    form.action = 'https://stackblitz.com/run';
    addHiddenInput(form, 'project[template]', 'javascript');
    addHiddenInput(form, 'project[title]', demoConfig.title);
    addHiddenInput(form, 'project[description]', demoConfig.description);
    addHiddenInput(form, 'project[dependencies]', JSON.stringify(demoConfig.dependencies));
    addHiddenInput(form, 'project[devDependencies]', JSON.stringify(demoConfig.devDependencies));
    Object.keys(demoConfig.files).forEach((key) => {
      const value = demoConfig.files[key];
      addHiddenInput(form, `project[files][${key}]`, value);
    });
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    handleMoreClose();
  };

  const showSourceHint = demoHovered && !sourceHintSeen;
  const DemoComponent = demoData.Component;
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

  const createHandleCodeSourceLink = (anchor) => async () => {
    try {
      await copy(`${window.location.href.split('#')[0]}#${anchor}`);
      setSnackbarMessage(t('copiedSourceLink'));
      setSnackbarOpen(true);
    } finally {
      handleMoreClose();
    }
  };

  const [codeOpen, setCodeOpen] = React.useState(demoOptions.defaultCodeOpen || false);

  React.useEffect(() => {
    const navigatedDemoName = getDemoName(window.location.hash);
    if (demoName === navigatedDemoName) {
      setCodeOpen(true);
    }
  }, [demoName]);

  const handleCodeOpenClick = () => {
    document.cookie = `sourceHintSeen=true;path=/;max-age=31536000`;
    setCodeOpen((open) => !open);
    setSourceHintSeen(setSourceHintSeen(true));
  };

  const match = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const jsx = getJsxPreview(demoData.raw || '');
  const showPreview =
    !demoOptions.hideToolbar &&
    demoOptions.defaultCodeOpen !== false &&
    jsx !== demoData.raw &&
    jsx.split(/\n/).length <= 17;

  let showCodeLabel;
  if (codeOpen) {
    showCodeLabel = showPreview ? t('hideFullSource') : t('hideSource');
  } else {
    showCodeLabel = showPreview ? t('showFullSource') : t('showSource');
  }

  const [demoKey, resetDemo] = React.useReducer((key) => key + 1, 0);

  const demoSourceId = useUniqueId(`demo-`);
  const openDemoSource = codeOpen || showPreview;

  return (
    <div className={classes.root}>
      <div
        className={clsx(classes.demo, {
          [classes.demoHiddenToolbar]: demoOptions.hideToolbar,
          [classes.demoBgOutlined]: demoOptions.bg === 'outlined',
          [classes.demoBgTrue]: demoOptions.bg === true,
          [classes.demoBgInline]: demoOptions.bg === 'inline',
        })}
        tabIndex={-1}
        onMouseEnter={handleDemoHover}
        onMouseLeave={handleDemoHover}
      >
        <DemoSandboxed
          key={demoKey}
          style={demoSandboxedStyle}
          component={DemoComponent}
          iframe={demoOptions.iframe}
          name={demoName}
          onResetDemoClick={resetDemo}
        />
      </div>
      <div className={classes.anchorLink} id={`${demoName}.js`} />
      <div className={classes.anchorLink} id={`${demoName}.tsx`} />
      {demoOptions.hideToolbar ? null : (
        <div
          aria-controls={openDemoSource ? demoSourceId : null}
          aria-label={t('demoToolbarLabel')}
          className={classes.toolbar}
          role="toolbar"
        >
          <NoSsr defer>
            <DemoLanguages
              demo={demo}
              codeOpen={codeOpen}
              codeVariant={codeVariant}
              gaEventLabel={demoOptions.demo}
              onLanguageClick={handleCodeLanguageClick}
            />
            <div className={classes.toolbarButtons}>
              <Tooltip
                classes={{ popper: classes.tooltip }}
                key={showSourceHint}
                open={showSourceHint && match ? true : undefined}
                PopperProps={{ disablePortal: true }}
                title={showCodeLabel}
                placement="top"
              >
                <IconButton
                  aria-label={showCodeLabel}
                  data-ga-event-category="demo"
                  data-ga-event-label={demoOptions.demo}
                  data-ga-event-action="expand"
                  onClick={handleCodeOpenClick}
                  color={demoHovered ? 'primary' : 'default'}
                >
                  <CodeIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              {demoOptions.hideEditButton ? null : (
                <Tooltip
                  classes={{ popper: classes.tooltip }}
                  title={t('codesandbox')}
                  placement="top"
                >
                  <IconButton
                    aria-label={t('codesandbox')}
                    data-ga-event-category="demo"
                    data-ga-event-label={demoOptions.demo}
                    data-ga-event-action="codesandbox"
                    onClick={handleCodeSandboxClick}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip
                classes={{ popper: classes.tooltip }}
                title={t('copySource')}
                placement="top"
              >
                <IconButton
                  aria-label={t('copySource')}
                  data-ga-event-category="demo"
                  data-ga-event-label={demoOptions.demo}
                  data-ga-event-action="copy"
                  onClick={handleCopyClick}
                >
                  <FileCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip classes={{ popper: classes.tooltip }} title={t('resetDemo')} placement="top">
                <IconButton
                  aria-label={t('resetDemo')}
                  data-ga-event-category="demo"
                  data-ga-event-label={demoOptions.demo}
                  data-ga-event-action="reset"
                  onClick={resetDemo}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <IconButton
                onClick={handleMoreClick}
                aria-owns={anchorEl ? 'demo-menu-more' : undefined}
                aria-haspopup="true"
                aria-label={t('seeMore')}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
              <Menu
                id="demo-menu-more"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMoreClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem
                  data-ga-event-category="demo"
                  data-ga-event-label={demoOptions.demo}
                  data-ga-event-action="github"
                  component="a"
                  href={demoData.githubLocation}
                  target="_blank"
                  rel="noopener nofollow"
                  onClick={handleMoreClose}
                >
                  {t('viewGitHub')}
                </MenuItem>
                {demoOptions.hideEditButton ? null : (
                  <MenuItem
                    data-ga-event-category="demo"
                    data-ga-event-label={demoOptions.demo}
                    data-ga-event-action="stackblitz"
                    onClick={handleStackBlitzClick}
                  >
                    {t('stackblitz')}
                  </MenuItem>
                )}
                <MenuItem
                  data-ga-event-category="demo"
                  data-ga-event-label={demoOptions.demo}
                  data-ga-event-action="copy-js-source-link"
                  onClick={createHandleCodeSourceLink(`${demoName}.js`)}
                >
                  {t('copySourceLinkJS')}
                </MenuItem>
                <MenuItem
                  data-ga-event-category="demo"
                  data-ga-event-label={demoOptions.demo}
                  data-ga-event-action="copy-ts-source-link"
                  onClick={createHandleCodeSourceLink(`${demoName}.tsx`)}
                >
                  {t('copySourceLinkTS')}
                </MenuItem>
              </Menu>
            </div>
          </NoSsr>
        </div>
      )}
      <Collapse in={openDemoSource} unmountOnExit>
        <MarkdownElement
          className={classes.code}
          id={demoSourceId}
          text={`\`\`\`${demoData.sourceLanguage}\n${codeOpen ? demoData.raw : jsx}\n\`\`\``}
        />
      </Collapse>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
  demo: PropTypes.object.isRequired,
  demoOptions: PropTypes.object.isRequired,
  githubLocation: PropTypes.string.isRequired,
};

export default withStyles(styles)(Demo);
