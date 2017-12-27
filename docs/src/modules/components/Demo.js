import React from 'react';
import LZString from 'lz-string';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import CodeIcon from 'material-ui-icons/Code';
import Tooltip from 'material-ui/Tooltip';
import Github from 'docs/src/modules/components/GitHub';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';

const styles = theme => ({
  root: {
    position: 'relative',
    marginBottom: 40,
    marginLeft: -theme.spacing.unit * 2,
    marginRight: -theme.spacing.unit * 2,
    clear: 'both',
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing.unit}px`,
      marginLeft: 0,
      marginRight: 0,
    },
  },
  demo: theme.mixins.gutters({
    backgroundColor: theme.palette.background.contentFrame,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 6,
    },
  }),
  header: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flip: false,
      zIndex: 10,
      position: 'absolute',
      top: 2,
      right: theme.spacing.unit * 2,
    },
  },
  code: {
    display: 'none',
    padding: 0,
    margin: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '& pre': {
      overflow: 'auto',
      margin: '0px !important',
      borderRadius: '0px !important',
    },
  },
});

function compress(object) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

class Demo extends React.Component {
  state = {
    codeOpen: false,
  };

  codesandboxForm = null;

  handleClickCodeOpen = () => {
    this.setState({
      codeOpen: !this.state.codeOpen,
    });
  };

  handleClickCodesandbox = () => {
    const codesandboxValue = {
      files: {
        'package.json': {
          content: {
            dependencies: {
              react: 'latest',
              'react-dom': 'latest',
              'material-ui': 'next',
              'material-ui-icons': 'latest',
              'react-autosuggest': 'latest',
              'autosuggest-highlight': 'latest',
              downshift: 'latest',
            },
          },
        },
        'demo.js': {
          content: this.props.raw,
        },
        'index.js': {
          content: `
import React from 'react';
import { render } from 'react-dom';
import Demo from './demo';

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<Demo />, rootElement);
}
          `,
        },
        'index.html': {
          content: `
<body>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <div id="root"></div>
</body>
            `,
        },
      },
    };

    this.codesandboxForm.querySelector('[name="parameters"]').value = compress(codesandboxValue);
    this.codesandboxForm.submit();
  };

  render() {
    const { classes, demoOptions, githubLocation, js: DemoComponent, raw } = this.props;
    const { codeOpen } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <form
            ref={node => {
              this.codesandboxForm = node;
            }}
            method="post"
            action="https://codesandbox.io/api/v1/sandboxes/define"
            target="_blank"
          >
            <input type="hidden" name="parameters" value="" />
          </form>
          <Tooltip
            id="demo-github"
            title="See the source on GitHub"
            target="_blank"
            placement="top"
          >
            <IconButton href={githubLocation} aria-labelledby="demo-github">
              <Github />
            </IconButton>
          </Tooltip>
          {demoOptions.hideEditButton ? null : (
            <Tooltip id="demo-codesandbox" title="Edit in codesandbox" placement="top">
              <IconButton onClick={this.handleClickCodesandbox} aria-labelledby="demo-codesandbox">
                <ModeEditIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip
            id="demo-source"
            title={codeOpen ? 'Hide the source' : 'Show the source'}
            placement="top"
          >
            <IconButton onClick={this.handleClickCodeOpen} aria-labelledby="demo-source">
              <CodeIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Collapse in={codeOpen} unmountOnExit>
          <MarkdownElement dir="ltr" className={classes.code} text={`\`\`\`jsx\n${raw}\n\`\`\``} />
        </Collapse>
        <div className={classes.demo}>
          <DemoComponent />
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
  demoOptions: PropTypes.object.isRequired,
  githubLocation: PropTypes.string.isRequired,
  js: PropTypes.func.isRequired,
  raw: PropTypes.string.isRequired,
};

export default withStyles(styles)(Demo);
