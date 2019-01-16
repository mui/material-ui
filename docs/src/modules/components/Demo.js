import React from 'react';
import LZString from 'lz-string';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import copy from 'clipboard-copy';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
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
import HookLogo from '@material-ui/docs/svgIcons/HookLogo';
import MarkdownElement from '@material-ui/docs/MarkdownElement';
import { getDependencies } from 'docs/src/modules/utils/helpers';
import DemoFrame from 'docs/src/modules/components/DemoFrame';
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

function getDemo(props, raw) {
  const demo = {
    title: 'Material demo',
    description: props.githubLocation,
    dependencies: getDependencies(raw, props.demoOptions.react),
    files: {
      'demo.js': raw,
      'index.js': `
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './demo';

ReactDOM.render(<Demo />, document.querySelector('#root'));
      `,
      'index.html': `
<body>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <div id="root"></div>
</body>
      `,
    },
  };

  if (props.codeVariant === CODE_VARIANTS.HOOK) {
    demo.dependencies.react = 'next';
    demo.dependencies['react-dom'] = 'next';
    demo.dependencies['@material-ui/styles'] = 'latest';
    demo.files['index.js'] = `
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './demo';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({ typography: { useNextVariants: true } });

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Demo />
  </ThemeProvider>,
  document.querySelector("#root")
);
    `;
  }

  return demo;
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
    const demo = getDemo(this.props, this.getDemoData().raw);
    const parameters = compress({
      files: {
        'package.json': {
          content: {
            title: demo.title,
            description: demo.description,
            dependencies: demo.dependencies,
          },
        },
        'demo.js': {
          content: demo.files['demo.js'],
        },
        'index.js': {
          content: demo.files['index.js'],
        },
        'index.html': {
          content: demo.files['index.html'],
        },
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
    const { codeVariant } = this.state;
    const demo = getDemo(this.props, codeVariant);
    const form = document.createElement('form');
    form.method = 'POST';
    form.target = '_blank';
    form.action = 'https://stackblitz.com/run';
    addHiddenInput(form, 'project[template]', 'javascript');
    addHiddenInput(form, 'project[title]', demo.title);
    addHiddenInput(form, 'project[description]', demo.description);
    addHiddenInput(form, 'project[dependencies]', JSON.stringify(demo.dependencies));
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
    const codeVariant = event.currentTarget.value;

    if (this.props.codeVariant !== codeVariant) {
      document.cookie = `codeVariant=${codeVariant};path=/;max-age=31536000`;

      this.props.dispatch({
        type: ACTION_TYPES.OPTIONS_CHANGE,
        payload: {
          codeVariant,
        },
      });
    }

    this.setState(prevState => ({
      /**
       * if the the same code type is open,
       * toggle the state, otherwise if it is
       * another code type always open it. i.e, true
       */
      codeOpen: this.props.codeVariant === codeVariant ? !prevState.codeOpen : true,
    }));
  };

  handleClickCodeOpen = () => {
    this.setState(state => ({
      codeOpen: !state.codeOpen,
    }));
  };

  getDemoData = () => {
    const { codeVariant, demo } = this.props;
    return codeVariant === CODE_VARIANTS.HOOK && demo.rawHooks
      ? {
          codeVariant: CODE_VARIANTS.HOOK,
          raw: demo.rawHooks,
          js: demo.jsHooks,
        }
      : {
          codeVariant: CODE_VARIANTS.JS,
          js: demo.js,
          raw: demo.raw,
        };
  };

  render() {
    const { classes, demo, demoOptions, githubLocation: githubLocationJS } = this.props;
    const { anchorEl, codeOpen } = this.state;
    const category = demoOptions.demo;
    const demoData = this.getDemoData();
    const DemoComponent = demoData.js;
    const githubLocation =
      demoData.codeVariant === CODE_VARIANTS.HOOK
        ? githubLocationJS.replace(/\.jsx?$/, '.hooks.js')
        : githubLocationJS;

    return (
      <div className={classes.root}>
        {demoOptions.hideHeader ? null : (
          <div>
            <div className={classes.header}>
              {demo.rawHooks && (
                <Tooltip title="Set source using React Hooks" placement="top">
                  <IconButton
                    aria-label="Set source using React Hooks"
                    onClick={this.handleCodeLanguageClick}
                    value={CODE_VARIANTS.HOOK}
                  >
                    <HookLogo />
                  </IconButton>
                </Tooltip>
              )}
              {demo.rawHooks && (
                <Tooltip title="Set source in JavaScript" placement="top">
                  <IconButton
                    aria-label="Set source in JavaScript"
                    onClick={this.handleCodeLanguageClick}
                    value={CODE_VARIANTS.JS}
                  >
                    <JSLogo />
                  </IconButton>
                </Tooltip>
              )}
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
                    Edit in StackBlitz
                  </MenuItem>
                )}
              </Menu>
            </div>
            <Collapse in={codeOpen} unmountOnExit>
              <MarkdownElement
                dir="ltr"
                className={classes.code}
                text={`\`\`\`jsx\n${demoData.raw}\n\`\`\``}
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
