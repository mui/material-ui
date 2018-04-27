import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';

import Utils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import frLocale from 'date-fns/locale/fr';
import enLocale from 'date-fns/locale/en-US';

import { setPrismTheme } from './utils/prism';
import Layout from './layout/Layout';
import Routes from './Routes/Routes';

/* eslint-disable import/first */
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

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
          <MuiPickersUtilsProvider
            utils={Utils}
            locale={this.state.localeObj}
          >
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
