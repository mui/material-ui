import React from 'react';
import PropTypes from 'prop-types';
import { create } from 'jss';
import { withStyles } from '@material-ui/core/styles';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import NoSsr from '@material-ui/core/NoSsr';
import rtl from 'jss-rtl';
import Frame from 'react-frame-component';

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
    const { children, classes } = this.props;

    // NoSsr fixes a strange concurrency issue with iframe and quick React mount/unmount
    return (
      <NoSsr>
        <Frame
          ref={this.handleRef}
          className={classes.root}
          contentDidMount={this.onContentDidMount}
          contentDidUpdate={this.onContentDidUpdate}
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

export default withStyles(styles, { withTheme: true })(DemoFrame);
