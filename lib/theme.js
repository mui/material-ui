'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ThemeManager = require('./styles/theme-manager');

var Theme = React.createClass({
  displayName: 'Theme',

  propTypes: {
    theme: React.PropTypes.object
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
    muiThemeManager: React.PropTypes.object.isRequired
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.themeManager.getCurrentTheme(),
      muiThemeManager: this.themeManager
    };
  },

  componentWillMount: function componentWillMount() {
    this.themeManager = new ThemeManager();

    if (this.props.theme) {
      this.themeManager.setTheme(this.props.theme);
    }
  },

  render: function render() {
    return this.props.children({
      muiTheme: this.themeManager.getCurrentTheme(),
      muiThemeManager: this.themeManager
    });
  }
});

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

function theme(customTheme) {
  return function (Component) {
    return React.createClass({

      displayName: 'Theme(' + getDisplayName(Component) + ')',

      render: function render() {
        return React.createElement(
          Theme,
          { theme: customTheme },
          (function (props) {
            return React.createElement(Component, _extends({}, this.props, props));
          }).bind(this)
        );
      }
    });
  };
}

module.exports = Theme;
module.exports.theme = theme;