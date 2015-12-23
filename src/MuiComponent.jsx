import React from 'react';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

export default class MuiComponent extends React.Component {

  static DEFAULT_THEME;

  static contextTypes = {
    muiTheme: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    if (!context || !context.muiTheme) {
      if (!MuiComponent.DEFAULT_THEME) {
        MuiComponent.DEFAULT_THEME = ThemeManager.getMuiTheme(DefaultRawTheme);
      }
      this.state = {muiTheme: MuiComponent.DEFAULT_THEME};
    } else {
      this.state = {muiTheme: context.muiTheme};
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.muiTheme !== this.state.muiTheme) {
      this.setState({muiTheme: nextContext.muiTheme});
    }
  }

// shouldComponentUpdate Optimazation

// Style Calculation/Memoization!

// All the other cross-cutting concerns can be handled here!

  render() {
    throw new Error('MuiComponent is abstract, and it\' render method must be overriden.');
  }
}
