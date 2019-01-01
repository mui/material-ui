import * as React from 'react';
import Layout from './layout/Layout';
import Router from './Pages/Router';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { UtilsServiceContextProvider } from './_shared/UtilsServiceContext';
import { createUtilsService } from './utils/utilsService';

export const utilsMap = {
  moment: MomentUtils,
  luxon: LuxonUtils,
  'date-fns': DateFnsUtils,
};

export type UtilsLib = keyof typeof utilsMap;

interface AppState {
  direction: 'rtl' | 'ltr';
  theme: 'light' | 'dark';
  utils: UtilsLib;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    direction: 'ltr',
    theme: 'light',
    utils: 'date-fns',
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

  handleChangeUtils = (utils: UtilsLib) => {
    this.setState({ utils });
  };

  private createMuiTheme = () => {
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
        <MuiPickersUtilsProvider utils={utilsMap[this.state.utils]}>
          <UtilsServiceContextProvider value={createUtilsService(this.state.utils)}>
            <Layout
              toggleThemeType={this.toggleTheme}
              toggleDirection={this.toggleDirection}
              onChangeUtils={this.handleChangeUtils}
            >
              <Router />
            </Layout>
          </UtilsServiceContextProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
