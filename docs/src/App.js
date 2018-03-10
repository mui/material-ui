import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';

import dateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import frLocale from 'date-fns/locale/fr';
import enLocale from 'date-fns/locale/en-US';

// import Demo from './Demo/Demo';
import { setPrismTheme } from './utils/prism';
import Layout from './layout/Layout';
import Routes from './Routes/Routes';

const jss = create({ plugins: [...preset().plugins, rtl()] });
jss.options.createGenerateClassName = createGenerateClassName;

export default class App extends Component {
  state = {
    type: 'light',
    direction: 'ltr',
    locale: 'en',
    localeObj: enLocale,
  }

  componentWillMount = () => {
    setPrismTheme(this.state.type);
  }

  getMuiTheme = () => createMuiTheme({
    direction: this.state.direction,
    palette: {
      type: this.state.type, // Switching the dark mode on is a single property value change.
    },
  })

  toggleDirection = () => {
    const direction = this.state.direction === 'ltr' ? 'rtl' : 'ltr';

    document.body.dir = direction;

    this.setState({ direction });
  }

  toggleThemeType = () => {
    const type = this.state.type === 'light' ? 'dark' : 'light';

    setPrismTheme(type);
    this.setState({ type });
  }

  toggleFrench = () => {
    if (this.state.locale === 'en') {
      this.setState({ locale: 'fr', localeObj: frLocale });
    } else {
      this.setState({ locale: 'en', localeObj: enLocale });
    }
  }

  render() {
    return (
      <JssProvider jss={jss}>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MuiPickersUtilsProvider utils={dateFnsUtils} locale={this.state.localeObj}>
            <Layout
              toggleDirection={this.toggleDirection}
              toggleThemeType={this.toggleThemeType}
              toggleFrench={this.toggleFrench}
            >
              <Routes />
            </Layout>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}
