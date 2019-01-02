import React from 'react';
import { JssProvider } from 'react-jss';
import { SheetsRegistry } from 'jss';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssInJs from './CssInJs';

const sheetsRegistry = new SheetsRegistry();
const theme = createMuiTheme({ typography: { useNextVariants: true } });

class JssRegistry extends React.Component {
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

  update() {
    if (this.state.length !== sheetsRegistry.registry.length) {
      this.setState({
        length: sheetsRegistry.registry.length,
      });
    }

    // Needed as the sheets are removed asynchronously to prevent FOUC.
    // (flash of unstyled content).
    this.timer = setTimeout(() => {
      if (this.state.length !== sheetsRegistry.registry.length) {
        this.setState({
          length: sheetsRegistry.registry.length,
        });
      }
    }, 1e3);
  }

  render() {
    return (
      <div>
        <JssProvider registry={sheetsRegistry}>
          <MuiThemeProvider theme={theme}>
            <CssInJs />
            <br />
            {'We are collecting all the sheets injected in the DOM.'}
            <br />
            {`The size of the registry is ${this.state.length}.`}
          </MuiThemeProvider>
        </JssProvider>
      </div>
    );
  }
}

export default JssRegistry;
