import * as React from 'react';
import Layout from './layout/Layout';
import Router from './Pages/Router';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

interface AppState {
  direction: 'rtl' | 'ltr';
  theme: 'light' | 'dark';
}
class App extends React.Component<{}, AppState> {
  state: AppState = {
    direction: 'ltr',
    theme: 'light',
  };

  toggleDirection = () => {
    const newDirection = this.state.direction === 'ltr' ? 'rtl' : 'ltr';

    document.body.dir = newDirection;
    this.setState({ direction: newDirection });
  };

  toggleTheme = () => {
    this.setState({
      theme: this.state.theme === 'light' ? 'dark' : 'light',
    });
  };

  createMuiTheme = () => {
    const { theme, direction } = this.state;

    return createMuiTheme({
      direction,
      palette: {
        type: theme,
      },
    });
  };

  render() {
    return (
      <MuiThemeProvider theme={this.createMuiTheme()}>
        <Layout toggleDirection={this.toggleDirection} toggleThemeType={this.toggleTheme}>
          <Router />
        </Layout>
      </MuiThemeProvider>
    );
  }
}

export default App;
