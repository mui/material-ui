// @flow weak

import * as React from 'react';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import CssInJs from './CssInJs';

const sheetsRegistry = new SheetsRegistry();
const theme = createMuiTheme();

class JssRegistry extends React.Component<any, any> {
  static defaultProps: {};
  state = {
    length: 0,
  };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  timer = null;

  update() {
    if (this.state.length !== sheetsRegistry.registry.length) {
      this.setState({
        length: sheetsRegistry.registry.length,
      });
    }

    // Needed as the sheets are removed asynchronously to prevent FOUC.
    this.timer = setTimeout(() => {
      if (this.state.length !== sheetsRegistry.registry.length) {
        this.setState({
          length: sheetsRegistry.registry.length,
        });
      }
    }, 1000);
  }

  render() {
    return (
      <JssProvider registry={sheetsRegistry}>
        <MuiThemeProvider theme={theme}>
          <div>
            <CssInJs />
            <br />
            {'We are collecting all the sheets injected in the DOM.'}
            <br />
            {`The size of the registry is ${this.state.length}.`}
          </div>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

export default JssRegistry;
