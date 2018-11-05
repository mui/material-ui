import React from 'react';
import LZString from 'lz-string';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import copy from 'clipboard-copy';
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
import JSLogo from '@material-ui/docs/svgIcons/JSLogo';
import TSLogo from '@material-ui/docs/svgIcons/TSLogo';
import MarkdownElement from '@material-ui/docs/MarkdownElement';
import DemoFrame from 'docs/src/modules/components/DemoFrame';
import getDemo from 'docs/src/modules/utils/demoConfig';
import TSCodeBadge from 'docs/src/modules/components/TSCodeBadge';

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
  demo: theme.mixins.gutters({
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 6,
      paddingBottom: theme.spacing.unit * 3,
    },
  }),
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
      position: 'absolute',
      top: 0,
      right: theme.spacing.unit,
    },
  },
  code: {
    display: 'none',
    padding: 0,
    margin: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      paddingTop: theme.spacing.unit * 6,
    },
    '& pre': {
      overflow: 'auto',
      margin: '0px !important',
      borderRadius: '0px !important',
    },
  },
});

class Demo extends React.Component {
  state = {
    anchorEl: null,
    codeLanguage: 'JS',
    codeOpen: false,
  };

  getTSTooltip() {
    if (this.hasTSVersion()) {
      const { outdatedTS } = this.props;
      return `Source in TypeScript${outdatedTS ? ' (outdated)' : ''}`;
    }
    return 'No code in TypeScript available';
  }

  handleClickMore = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMore = () => {
    this.setState({ anchorEl: null });
  };

  handleClickCodeOpen = () => {
    this.setState(state => ({
      codeOpen: !state.codeOpen,
    }));
  };

  handleClickCodeSandbox = () => {
    const { codeLanguage } = this.state;
    const demo = getDemo(this.props, codeLanguage);
    const parameters = compress({
      files: {
        'package.json': {
          content: {
            title: demo.title,
            description: demo.description,
            dependencies: demo.dependencies,
            devDependencies: demo.devDependencies,
            main: `index.${codeLanguage === 'TS' ? 'tsx' : 'js'}`,
          },
        },
        ...Object.keys(demo.files).reduce((files, name) => {
          files[name] = { content: demo.files[name] };
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
    const { raw: rawJS, rawTS } = this.props;
    const { codeLanguage } = this.state;

    const raw = codeLanguage === 'TS' ? rawTS : rawJS;

    try {
      await copy(raw);
    } finally {
      this.handleCloseMore();
    }
  };

  handleClickStackBlitz = () => {
    const { codeLanguage } = this.state;
    const demo = getDemo(this.props, codeLanguage);
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

  handleCodeLanguageClick = event => {
    const { name } = this.props;
    const { value: codeLanguage } = event.currentTarget;
    const { ga = () => {} } = window;

    ga('send', 'event', 'Demo', 'codeLanguageClick', name, codeLanguage);
    this.setState({
      codeLanguage,
      codeOpen: true,
    });
  };

  hasTSVersion() {
    return Boolean(this.props.rawTS);
  }

  render() {
    const {
      classes,
      demoOptions,
      enableCodeLanguageSwitch,
      githubLocation: githubLocationJS,
      index,
      js: DemoComponent,
      outdatedTS,
      rawJS,
      rawTS,
    } = this.props;
    const { anchorEl, codeLanguage, codeOpen } = this.state;
    const category = demoOptions.demo;

    const hasTSVersion = this.hasTSVersion();
    const tsTooltip = this.getTSTooltip();

    const githubLocation =
      codeLanguage === 'TS' ? githubLocationJS.replace(/\.jsx?$/, '.tsx') : githubLocationJS;
    const raw = codeLanguage === 'TS' && hasTSVersion ? rawTS : rawJS;

    return (
      <div className={classes.root}>
        {demoOptions.hideHeader ? null : (
          <div>
            <div className={classes.header}>
              {enableCodeLanguageSwitch && (
                <>
                  <Tooltip title="Display source in JavaScript" placement="top">
                    <IconButton
                      aria-label="Display source in JavaScript"
                      onClick={this.handleCodeLanguageClick}
                      value="JS"
                    >
                      <JSLogo />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={tsTooltip} placement="top">
                    <span>
                      <IconButton
                        aria-label={tsTooltip}
                        disabled={!hasTSVersion}
                        onClick={this.handleCodeLanguageClick}
                        value="TS"
                      >
                        <TSCodeBadge outdatedTS={outdatedTS}>
                          <TSLogo color={hasTSVersion ? 'official' : 'inherit'} />
                        </TSCodeBadge>
                      </IconButton>
                    </span>
                  </Tooltip>
                </>
              )}
              <Tooltip title="See the source on GitHub" placement="top">
                <IconButton
                  data-ga-event-category={category}
                  data-ga-event-action="github"
                  href={githubLocation}
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
              <Tooltip title={codeOpen ? 'Hide the source' : 'Show the source'} placement="top">
                <IconButton
                  data-ga-event-category={category}
                  data-ga-event-action="expand"
                  onClick={this.handleClickCodeOpen}
                  aria-label={`Source of demo n°${index}`}
                >
                  <CodeIcon />
                </IconButton>
              </Tooltip>
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
            <Collapse in={codeOpen} unmountOnExit>
              <MarkdownElement
                dir="ltr"
                className={classes.code}
                text={`\`\`\`jsx\n${raw}\n\`\`\``}
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
  demoOptions: PropTypes.object.isRequired,
  enableCodeLanguageSwitch: PropTypes.bool,
  githubLocation: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  js: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  name: PropTypes.string.isRequired,
  outdatedTS: PropTypes.bool,
  rawJS: PropTypes.string.isRequired,
  rawTS: PropTypes.string,
};

export default withStyles(styles)(Demo);
