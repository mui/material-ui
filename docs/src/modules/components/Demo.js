import React from 'react';
import LZString from 'lz-string';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import copy from 'clipboard-copy';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import EditIcon from '@material-ui/icons/Edit';
import CodeIcon from '@material-ui/icons/Code';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import { GitHub as GithubIcon } from '@material-ui/docs';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import DemoSandboxed from 'docs/src/modules/components/DemoSandboxed';
import DemoLanguages from 'docs/src/modules/components/DemoLanguages';
import getDemoConfig from 'docs/src/modules/utils/getDemoConfig';
import compose from 'docs/src/modules/utils/compose';
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

const styles = theme => ({
  root: {
    position: 'relative',
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
    outline: 'none',
    margin: 'auto',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.level1,
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
  },
  demoHiddenHeader: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3),
    },
  },
  header: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flip: false,
      top: 0,
      right: theme.spacing(1),
    },
    justifyContent: 'space-between',
  },
  code: {
    display: 'none',
    padding: 0,
    marginRight: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '& pre': {
      overflow: 'auto',
      paddingTop: theme.spacing(5),
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

function Demo(props) {
  const { classes, codeVariant, demo, demoOptions, dispatch, githubLocation, t } = props;
  const demoData = getDemoData(codeVariant, demo, githubLocation);

  const [sourceHintSeen, setSourceHintSeen] = React.useState(false);
  React.useEffect(() => {
    setSourceHintSeen(getCookie('sourceHintSeen'));
  }, []);

  const [demoHovered, setDemoHovered] = React.useState(false);
  function handleDemoHover(event) {
    setDemoHovered(event.type === 'mouseenter');
  }

  function handleCodeLanguageClick(event, clickedCodeVariant) {
    if (codeVariant !== clickedCodeVariant) {
      dispatch({
        type: ACTION_TYPES.OPTIONS_CHANGE,
        payload: {
          codeVariant: clickedCodeVariant,
        },
      });
    }
  }

  function handleClickCodeSandbox() {
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
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClickMore(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMore() {
    setAnchorEl(null);
  }

  async function handleClickCopy() {
    try {
      await copy(demoData.raw);
    } finally {
      handleCloseMore();
    }
  }

  function handleClickStackBlitz() {
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
    Object.keys(demoConfig.files).forEach(key => {
      const value = demoConfig.files[key];
      addHiddenInput(form, `project[files][${key}]`, value);
    });
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    handleCloseMore();
  }

  const showSourceHint = demoHovered && !sourceHintSeen;
  const DemoComponent = demoData.Component;
  const gaCategory = demoOptions.demo;
  const demoName = getDemoName(demoData.githubLocation);
  const demoSandboxedStyle = React.useMemo(
    () => ({
      maxWidth: demoOptions.maxWidth,
      height: demoOptions.height,
    }),
    [demoOptions.height, demoOptions.maxWidth],
  );

  const createHandleCodeSourceLink = anchor => async () => {
    try {
      await copy(`${window.location.href.split('#')[0]}#${anchor}`);
    } finally {
      handleCloseMore();
    }
  };

  const [codeOpen, setCodeOpen] = React.useState(demoOptions.defaultCodeOpen || false);

  React.useEffect(() => {
    const navigatedDemoName = getDemoName(window.location.hash);
    if (demoName === navigatedDemoName) {
      setCodeOpen(true);
    }
  }, [demoName]);

  function handleClickCodeOpen() {
    document.cookie = `sourceHintSeen=true;path=/;max-age=31536000`;
    setCodeOpen(open => !open);
    setSourceHintSeen(setSourceHintSeen(true));
  }

  return (
    <div className={classes.root}>
      <div className={classes.anchorLink} id={`${demoName}.js`} />
      <div className={classes.anchorLink} id={`${demoName}.tsx`} />
      {demoOptions.hideHeader ? null : (
        <div>
          <div className={classes.header}>
            <DemoLanguages
              demo={demo}
              codeOpen={codeOpen}
              codeVariant={codeVariant}
              gaEventCategory={gaCategory}
              onLanguageClick={handleCodeLanguageClick}
            />
            <div>
              <Tooltip
                classes={{ popper: classes.tooltip }}
                key={showSourceHint}
                open={showSourceHint ? true : undefined}
                PopperProps={{ disablePortal: true }}
                title={codeOpen ? t('hideSource') : t('showSource')}
                placement="top"
              >
                <IconButton
                  aria-label={codeOpen ? t('hideSource') : t('showSource')}
                  data-ga-event-category={gaCategory}
                  data-ga-event-action="expand"
                  onClick={handleClickCodeOpen}
                  color={demoHovered ? 'primary' : 'default'}
                >
                  <CodeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                classes={{ popper: classes.tooltip }}
                title={t('viewGitHub')}
                placement="top"
              >
                <IconButton
                  aria-label={t('viewGitHub')}
                  data-ga-event-category={gaCategory}
                  data-ga-event-action="github"
                  href={demoData.githubLocation}
                  target="_blank"
                  rel="noopener nofollow"
                >
                  <GithubIcon />
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
                    data-ga-event-category={gaCategory}
                    data-ga-event-action="codesandbox"
                    onClick={handleClickCodeSandbox}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              <IconButton
                onClick={handleClickMore}
                aria-owns={anchorEl ? 'demo-menu-more' : undefined}
                aria-haspopup="true"
                aria-label={t('seeMore')}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="demo-menu-more"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMore}
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
                  data-ga-event-category={gaCategory}
                  data-ga-event-action="copy"
                  onClick={handleClickCopy}
                >
                  {t('copySource')}
                </MenuItem>
                {demoOptions.hideEditButton ? null : (
                  <MenuItem
                    data-ga-event-category={gaCategory}
                    data-ga-event-action="stackblitz"
                    onClick={handleClickStackBlitz}
                  >
                    {t('stackblitz')}
                  </MenuItem>
                )}
                <MenuItem
                  data-ga-event-category={gaCategory}
                  data-ga-event-action="copy-js-source-link"
                  onClick={createHandleCodeSourceLink(`${demoName}.js`)}
                >
                  {t('copySourceLinkJS')}
                </MenuItem>
                <MenuItem
                  data-ga-event-category={gaCategory}
                  data-ga-event-action="copy-ts-source-link"
                  onClick={createHandleCodeSourceLink(`${demoName}.tsx`)}
                >
                  {t('copySourceLinkTS')}
                </MenuItem>
              </Menu>
            </div>
          </div>
          <Collapse in={codeOpen} unmountOnExit>
            <MarkdownElement
              className={classes.code}
              text={`\`\`\`${demoData.sourceLanguage}\n${demoData.raw}\n\`\`\``}
            />
          </Collapse>
        </div>
      )}
      <div
        className={clsx(classes.demo, {
          [classes.demoHiddenHeader]: demoOptions.hideHeader,
        })}
        tabIndex={-1}
        onMouseEnter={handleDemoHover}
        onMouseLeave={handleDemoHover}
      >
        <DemoSandboxed
          style={demoSandboxedStyle}
          component={DemoComponent}
          iframe={demoOptions.iframe}
          name={demoName}
        />
      </div>
    </div>
  );
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
  codeVariant: PropTypes.string.isRequired,
  demo: PropTypes.object.isRequired,
  demoOptions: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  githubLocation: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({
    codeVariant: state.options.codeVariant,
    t: state.options.t,
  })),
  withStyles(styles),
)(Demo);
