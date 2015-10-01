const React = require('react');
const ThemeManager = require('./styles/theme-manager');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');

const AppBarSubComponent = React.createClass({
	getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };    
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  render() {
  	return (this.props.children);
  },
});

module.exports = AppBarSubComponent;
