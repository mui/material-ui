import React from 'react';
import PropTypes from 'prop-types';
import { create } from 'jss';
import {
  withStyles,
  createGenerateClassName,
  jssPreset,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
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

const generateClassName = createGenerateClassName();

class DemoFrame extends React.Component {
  state = {
    ready: false,
  };

  handleRef = ref => {
    this.contentDocument = ref ? ref.node.contentDocument : null;
  };

  onContentDidMount = () => {
    this.setState({
      ready: true,
      jss: create({
        plugins: [...jssPreset().plugins, rtl()],
        insertionPoint: this.contentDocument.querySelector('#demo-frame-jss'),
      }),
      sheetsManager: new Map(),
      container: this.contentDocument.body,
    });
  };

  onContentDidUpdate = () => {
    this.contentDocument.body.dir = this.props.theme.direction;
  };

  render() {
    const { children, classes, theme } = this.props;

    const inIframe = this.state.ready ? (
      <StylesProvider jss={this.state.jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={this.state.sheetsManager}>
          {React.cloneElement(children, {
            container: this.state.container,
          })}
        </MuiThemeProvider>
      </StylesProvider>
    ) : null;

    return (
      <Frame
        ref={this.handleRef}
        className={classes.root}
        contentDidMount={this.onContentDidMount}
        contentDidUpdate={this.onContentDidUpdate}
      >
        <div id="demo-frame-jss" />
        {inIframe}
      </Frame>
    );
  }
}

DemoFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DemoFrame);
