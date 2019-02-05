import React from 'react';
import LZString from 'lz-string';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
import MarkdownElement from '@material-ui/docs/MarkdownElement';
import DemoFrame from 'docs/src/modules/components/DemoFrame';
import DemoLanguages from 'docs/src/modules/components/DemoLanguages';
import getDemoConfig from 'docs/src/modules/utils/getDemoConfig';
import { ACTION_TYPES, CODE_VARIANTS } from 'docs/src/modules/constants';
import compose from 'docs/src/modules/utils/compose';

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
    marginLeft: -theme.spacing.unit * 2,
    marginRight: -theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing.unit}px`,
      marginLeft: 0,
      marginRight: 0,
    },
  },
  demo: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3,
    },
  },
  demoHiddenHeader: {
    paddingTop: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 3,
    },
  },
  header: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flip: false,
      top: 0,
      right: theme.spacing.unit,
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
      paddingTop: theme.spacing.unit * 5,
      margin: '0px !important',
      borderRadius: '0px !important',
    },
  },
});

class Demo extends React.Component {
  state = {
    anchorEl: null,
    codeOpen: false,
  };

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
    this.setState(state => ({
      codeOpen: !state.codeOpen,
    }));
  };

  getDemoData = () => {
    const { codeVariant, demo, githubLocation } = this.props;
    if (codeVariant === CODE_VARIANTS.HOOK && demo.rawHooks) {
      return {
        codeVariant: CODE_VARIANTS.HOOK,
        githubLocation: githubLocation.replace(/\.jsx?$/, '.hooks.js'),
        raw: demo.rawHooks,
        js: demo.jsHooks,
      };
    }
    if (codeVariant === CODE_VARIANTS.TS && demo.rawTS) {
      return {
        codeVariant: CODE_VARIANTS.TS,
        githubLocation: githubLocation.replace(/\.js$/, '.tsx'),
        raw: demo.rawTS,
        js: demo.js,
      };
    }

    return {
      codeVariant: CODE_VARIANTS.JS,
      githubLocation,
      raw: demo.raw,
      js: demo.js,
    };
  };

  render() {
    const { classes, codeVariant, demo, demoOptions } = this.props;
    const { anchorEl, codeOpen } = this.state;
    const category = demoOptions.demo;
    const demoData = this.getDemoData();
    const DemoComponent = demoData.js;
    const sourceLanguage = demoData.codeVariant === CODE_VARIANTS.TS ? 'tsx' : 'jsx';

    return (
      <div className={classes.root}>
        {demoOptions.hideHeader ? null : (
          <div>
            <div className={classes.header}>
              <DemoLanguages
                demo={demo}
                codeOpen={codeOpen}
                codeVariant={codeVariant}
                gaEventCategory={category}
                onLanguageClick={this.handleCodeLanguageClick}
              />
              <div>
                <Tooltip title={codeOpen ? 'Hide the source' : 'Show the source'} placement="top">
                  <IconButton
                    data-ga-event-category={category}
                    data-ga-event-action="expand"
                    onClick={this.handleClickCodeOpen}
                    aria-label={codeOpen ? 'Hide the source' : 'Show the source'}
                  >
                    <CodeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View the source on GitHub" placement="top">
                  <IconButton
                    data-ga-event-category={category}
                    data-ga-event-action="github"
                    href={demoData.githubLocation}
                    target="_blank"
                    aria-label="GitHub"
                  >
                    <Github />
                  </IconButton>
                </Tooltip>
                {demoOptions.hideEditButton ? null : (
                  <Tooltip title="Edit in CodeSandbox" placement="top">
                    <IconButton
                      data-ga-event-category={category}
                      data-ga-event-action="codesandbox"
                      onClick={this.handleClickCodeSandbox}
                      aria-label="CodeSandbox"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <IconButton
                  onClick={this.handleClickMore}
                  aria-owns={anchorEl ? 'demo-menu-more' : undefined}
                  aria-haspopup="true"
                  aria-label="See more"
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
                    data-ga-event-category={category}
                    data-ga-event-action="copy"
                    onClick={this.handleClickCopy}
                  >
                    Copy the source
                  </MenuItem>
                  {demoOptions.hideEditButton ? null : (
                    <MenuItem
                      data-ga-event-category={category}
                      data-ga-event-action="stackblitz"
                      onClick={this.handleClickStackBlitz}
                    >
                      Edit in StackBlitz (JS only)
                    </MenuItem>
                  )}
                </Menu>
              </div>
            </div>
            <Collapse in={codeOpen} unmountOnExit>
              <MarkdownElement
                dir="ltr"
                className={classes.code}
                text={`\`\`\`${sourceLanguage}\n${demoData.raw}\n\`\`\``}
              />
            </Collapse>
          </div>
        )}
        <div
          className={classNames(classes.demo, {
            [classes.demoHiddenHeader]: demoOptions.hideHeader,
          })}
        >
          {demoOptions.iframe ? (
            <DemoFrame>
              <DemoComponent />
            </DemoFrame>
          ) : (
            <DemoComponent />
          )}
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
};

export default compose(
  connect(state => ({
    codeVariant: state.options.codeVariant,
  })),
  withStyles(styles),
)(Demo);
