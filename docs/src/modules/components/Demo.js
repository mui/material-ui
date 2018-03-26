import React from 'react';
import LZString from 'lz-string';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import CodeIcon from 'material-ui-icons/Code';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Tooltip from 'material-ui/Tooltip';
import Github from '@material-ui/docs/svgIcons/GitHub';
import MarkdownElement from '@material-ui/docs/MarkdownElement';
import { getDependencies } from 'docs/src/modules/utils/helpers';

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

function getDemo(props) {
  return {
    title: 'Material demo',
    description: props.githubLocation,
    dependencies: getDependencies(props.raw),
    files: {
      'demo.js': props.raw,
      'index.js': `
import React from 'react';
import { render } from 'react-dom';
import Demo from './demo';

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<Demo />, rootElement);
}
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
}

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
    },
  }),
  header: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flip: false,
      zIndex: 10,
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
    codeOpen: false,
  };

  handleClickMore = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMore = () => {
    this.setState({ anchorEl: null });
  };

  handleClickCodeOpen = () => {
    this.setState({
      codeOpen: !this.state.codeOpen,
    });
  };

  handleClickCodeSandbox = () => {
    const demo = getDemo(this.props);
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
      await copy(this.props.raw);
    } finally {
      this.handleCloseMore();
    }
  };

  handleClickStackBlitz = () => {
    const demo = getDemo(this.props);
    const form = document.createElement('form');
    form.method = 'POST';
    form.target = '_blank';
    form.action = 'https://stackblitz.com/run';
    addHiddenInput(form, 'project[template]', 'javascript');
    addHiddenInput(form, 'project[title]', demo.title);
    addHiddenInput(form, 'project[description]', demo.description);
    addHiddenInput(form, 'project[dependencies]', JSON.stringify(demo.dependencies));
    Object.entries(demo.files).forEach(([key, value]) => {
      addHiddenInput(form, `project[files][${key}]`, value);
    });
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    this.handleCloseMore();
  };

  render() {
    const { classes, demoOptions, githubLocation, index, js: DemoComponent, raw } = this.props;
    const { anchorEl, codeOpen } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Tooltip id={`demo-github-${index}`} title="See the source on GitHub" placement="top">
            <IconButton
              href={githubLocation}
              target="_blank"
              aria-labelledby={`demo-github-${index}`}
            >
              <Github />
            </IconButton>
          </Tooltip>
          {demoOptions.hideEditButton ? null : (
            <Tooltip id={`demo-codesandbox-${index}`} title="Edit in CodeSandbox" placement="top">
              <IconButton
                onClick={this.handleClickCodeSandbox}
                aria-labelledby={`demo-codesandbox-${index}`}
              >
                <ModeEditIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip
            id={`demo-source-${index}`}
            title={codeOpen ? 'Hide the source' : 'Show the source'}
            placement="top"
          >
            <IconButton onClick={this.handleClickCodeOpen} aria-labelledby={`demo-source-${index}`}>
              <CodeIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            onClick={this.handleClickMore}
            aria-owns={anchorEl ? 'demo-menu-more' : null}
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
              horizontal: 'right',
            }}
            transformOrigin={{
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={this.handleClickCopy}>Copy the source</MenuItem>
            {demoOptions.hideEditButton ? null : (
              <MenuItem onClick={this.handleClickStackBlitz}>Edit in StackBlitz</MenuItem>
            )}
          </Menu>
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
  index: PropTypes.number.isRequired,
  js: PropTypes.func.isRequired,
  raw: PropTypes.string.isRequired,
};

export default withStyles(styles)(Demo);
