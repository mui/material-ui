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
import Github from '@material-ui/docs/svgIcons/GitHub';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import DemoFrame from 'docs/src/modules/components/DemoFrame';
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
});

class Demo extends React.Component {
  state = {
    anchorEl: null,
    codeOpen: Boolean(this.props.demoOptions.defaultCodeOpen),
    demoHovered: false,
    sourceHintSeen: false,
  };

  componentDidMount() {
    this.setState({ sourceHintSeen: getCookie('sourceHintSeen') });
  }

  handleClickMore = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMore = () => {
    this.setState({ anchorEl: null });
  };

  handleClickCodeSandbox = () => {
    const demoConfig = getDemoConfig(this.getDemoData());
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

  handleClickCopy = async () => {
    try {
      await copy(this.getDemoData().raw);
    } finally {
      this.handleCloseMore();
    }
  };

  handleClickStackBlitz = () => {
    const demo = getDemoConfig(this.getDemoData());
    const form = document.createElement('form');
    form.method = 'POST';
    form.target = '_blank';
    form.action = 'https://stackblitz.com/run';
    addHiddenInput(form, 'project[template]', 'javascript');
    addHiddenInput(form, 'project[title]', demo.title);
    addHiddenInput(form, 'project[description]', demo.description);
    addHiddenInput(form, 'project[dependencies]', JSON.stringify(demo.dependencies));
    addHiddenInput(form, 'project[devDependencies]', JSON.stringify(demo.devDependencies));
    Object.keys(demo.files).forEach(key => {
      const value = demo.files[key];
      addHiddenInput(form, `project[files][${key}]`, value);
    });
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    this.handleCloseMore();
  };

  handleCodeLanguageClick = (event, codeVariant) => {
    if (this.props.codeVariant !== codeVariant) {
      document.cookie = `codeVariant=${codeVariant};path=/;max-age=31536000`;
      window.ga('set', 'dimension1', codeVariant);

      this.props.dispatch({
        type: ACTION_TYPES.OPTIONS_CHANGE,
        payload: {
          codeVariant,
        },
      });
    }
  };

  handleClickCodeOpen = () => {
    document.cookie = `sourceHintSeen=true;path=/;max-age=31536000`;
    this.setState(state => ({
      codeOpen: !state.codeOpen,
      sourceHintSeen: true,
    }));
  };

  handleDemoHover = event => {
    this.setState({ demoHovered: event.type === 'mouseenter' });
  };

  getDemoData = () => {
    const { codeVariant, demo, githubLocation } = this.props;
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
  };

  render() {
    const { classes, codeVariant, demo, demoOptions, t } = this.props;
    const { anchorEl, codeOpen, demoHovered, sourceHintSeen } = this.state;
    const showSourceHint = demoHovered && !sourceHintSeen;

    const demoData = this.getDemoData();
    const DemoComponent = demoData.Component;
    const Sandbox = demoOptions.iframe ? DemoFrame : React.Fragment;
    const gaCategory = demoOptions.demo;

    return (
      <div className={classes.root}>
        {demoOptions.hideHeader ? null : (
          <div>
            <div className={classes.header}>
              <DemoLanguages
                demo={demo}
                codeOpen={codeOpen}
                codeVariant={codeVariant}
                gaEventCategory={gaCategory}
                onLanguageClick={this.handleCodeLanguageClick}
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
                    onClick={this.handleClickCodeOpen}
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
                    <Github />
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
                      onClick={this.handleClickCodeSandbox}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <IconButton
                  onClick={this.handleClickMore}
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
                  onClose={this.handleCloseMore}
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
                    onClick={this.handleClickCopy}
                  >
                    {t('copySource')}
                  </MenuItem>
                  {demoOptions.hideEditButton ? null : (
                    <MenuItem
                      data-ga-event-category={gaCategory}
                      data-ga-event-action="stackblitz"
                      onClick={this.handleClickStackBlitz}
                    >
                      {t('stackblitz')}
                    </MenuItem>
                  )}
                </Menu>
              </div>
            </div>
            <Collapse in={codeOpen} unmountOnExit>
              <MarkdownElement
                dir="ltr"
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
          onMouseEnter={this.handleDemoHover}
          onMouseLeave={this.handleDemoHover}
          style={{
            maxWidth: demoOptions.maxWidth,
          }}
        >
          <Sandbox>
            <DemoComponent />
          </Sandbox>
        </div>
      </div>
    );
  }
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
