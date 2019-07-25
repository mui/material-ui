import React from 'react';
import PropTypes from 'prop-types';
import { create } from 'jss';
import { withStyles } from '@material-ui/core/styles';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import NoSsr from '@material-ui/core/NoSsr';
import Typography from '@material-ui/core/Typography';
import rtl from 'jss-rtl';
import Frame from 'react-frame-component';

/**
 * Based on https://github.com/sindresorhus/new-github-issue-url/blob/061fa0ddb7d51f3b96d3a0f6a6bebb196f105a7b/index.js
 * with node 8 + IE11 support i.e. not using URL (URLSearchParams.set replaced with Map.set)
 */
function newGithubIssueUrl(options) {
  const url = `https://github.com/${options.user}/${options.repo}/issues/new`;

  const types = ['body', 'title', 'labels', 'template', 'milestone', 'assignee', 'projects'];

  const searchParams = new Map();

  types.forEach(type => {
    let value = options[type];
    if (value === undefined) {
      return;
    }

    if (type === 'labels' || type === 'projects') {
      if (!Array.isArray(value)) {
        throw new TypeError(`The \`${type}\` option should be an array`);
      }

      value = value.join(',');
    }

    searchParams.set(type, encodeURIComponent(value));
  });

  const query = Array.from(searchParams.entries())
    .map(entry => `${entry[0]}=${entry[1]}`)
    .join('&');
  return `${url}?${query}`;
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    height: 400,
    border: 'none',
    boxShadow: theme.shadows[1],
  },
});

class DemoFrame extends React.Component {
  state = {
    ready: false,
  };

  handleRef = ref => {
    this.contentDocument = ref ? ref.node.contentDocument : null;
    this.contentWindow = ref ? ref.node.contentWindow : null;
  };

  onContentDidMount = () => {
    this.setState({
      ready: true,
      jss: create({
        plugins: [...jssPreset().plugins, rtl()],
        insertionPoint: this.contentWindow['demo-frame-jss'],
      }),
      sheetsManager: new Map(),
      container: this.contentDocument.body,
      window: () => this.contentWindow,
    });
  };

  onContentDidUpdate = () => {
    this.contentDocument.body.dir = this.props.theme.direction;
  };

  render() {
    const { children, classes, theme, ...other } = this.props;

    // NoSsr fixes a strange concurrency issue with iframe and quick React mount/unmount
    return (
      <NoSsr>
        <Frame
          ref={this.handleRef}
          className={classes.root}
          contentDidMount={this.onContentDidMount}
          contentDidUpdate={this.onContentDidUpdate}
          {...other}
        >
          <div id="demo-frame-jss" />
          {this.state.ready ? (
            <StylesProvider jss={this.state.jss} sheetsManager={this.state.sheetsManager}>
              {React.cloneElement(children, {
                container: this.state.container,
                window: this.state.window,
              })}
            </StylesProvider>
          ) : null}
        </Frame>
      </NoSsr>
    );
  }
}

DemoFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const StyledFrame = withStyles(styles, { withTheme: true })(DemoFrame);

const sandboxedStyles = {
  paragraph: {
    width: '100%',
  },
};

/**
 * Isolates the demo component as best as possible. Additional props are spread
 * to an `iframe` if `iframe={true}`.
 */
class DemoSandboxed extends React.PureComponent {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  render() {
    const { classes, component: Component, iframe, name, ...other } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      const title = `[docs] Demo ${name} crashes`;
      const searchQuery = encodeURIComponent(`is:issue ${title}`);
      const issueLink = newGithubIssueUrl({
        user: 'mui-org',
        repo: 'material-ui',
        title,
        body: `
<!-- Please make sure you have fullfilled the following items before submitting -->
<!-- Checked checkbox should look like this: [x] -->
- [ ] I have [searched for similar issues](https://github.com/mui-org/material-ui/issues?q=${searchQuery}) of this repository and believe that this is not a duplicate.

## Steps to Reproduce
1. Visit ${window.location.href}
2. ??
3. demo *${name}* crashes

## Your Environment
| Tech         | Version |
|--------------|---------|
| Material-UI  | v${process.env.LIB_VERSION}  |
| Browser      | ${
          typeof window !== 'undefined' && window.navigator
            ? window.navigator.userAgent
            : '*Unknown*'
        } |
`,
      });

      /* eslint-disable material-ui/no-hardcoded-labels */
      return (
        <div>
          <Typography color="error" component="p" variant="h5">
            This demo had a runtime error
          </Typography>
          <Typography>
            We would appreciate it if you report this error directly to our issue tracker. By
            clicking the <Link href={issueLink}>report issue</Link> link you will be directed to our
            issue tracker with a prefilled description that includes valuable information about this
            error.
          </Typography>
        </div>
      );
      /* eslint-enable material-ui/no-hardcoded-labels */
    }

    const Sandbox = iframe ? StyledFrame : React.Fragment;
    const sandboxProps = iframe ? { title: `${name} demo`, ...other } : {};

    return (
      <Sandbox {...sandboxProps}>
        <Component />
      </Sandbox>
    );
  }
}

DemoSandboxed.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.elementType.isRequired,
  iframe: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default withStyles(sandboxedStyles)(DemoSandboxed);
