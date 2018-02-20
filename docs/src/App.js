import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';
import { MuiPickerUtilsProvider, dateFnsUtils, momentUtils } from 'material-ui-pickers';

import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

import Demo from './Demo/Demo';
import { setPrismTheme } from './utils/prism';

const jss = create({ plugins: [...preset().plugins, rtl()] });
jss.options.createGenerateClassName = createGenerateClassName;

export default class App extends Component {
  static propTypes = {
    toggleFrench: PropTypes.func.isRequired,
  }

  state = {
    type: 'light',
    direction: 'ltr',
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

  render() {
    return (
      <div className="root">
        <JssProvider jss={jss}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MuiPickerUtilsProvider utils={dateFnsUtils}>
              <Demo
                toggleDirection={this.toggleDirection}
                toggleThemeType={this.toggleThemeType}
                toggleFrench={this.props.toggleFrench}
              />
            </MuiPickerUtilsProvider>
          </MuiThemeProvider>
        </JssProvider>
      </div>
    );
  }
}
