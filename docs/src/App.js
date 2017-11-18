import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';

import Demo from './Demo/Demo';
import { setPrismTheme } from './utils/prism';

export default class App extends Component {
  state = {
    type: 'light',
  }

  componentWillMount = () => {
    setPrismTheme(this.state.type);
  }

  getMuiTheme = () => createMuiTheme({
    palette: {
      type: this.state.type, // Switching the dark mode on is a single property value change.
    },
  })

  toggleThemeType = () => {
    const type = this.state.type === 'light' ? 'dark' : 'light';

    setPrismTheme(type);
    this.setState({ type });
  }

  render() {
    return (
      <div className="root">
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <Demo
            toggleThemeType={this.toggleThemeType}
            toggleFrench={this.props.toggleFrench}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
