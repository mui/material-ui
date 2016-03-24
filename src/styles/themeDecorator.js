import React from 'react';
import warning from 'warning';

export default (customTheme) => {
  warning(false, 'ThemeDecorator is deprecated, please use MuiThemeProvider instead.');

  return function(Component) {
    return React.createClass({
      childContextTypes: {
        muiTheme: React.PropTypes.object,
      },

      getChildContext() {
        return {
          muiTheme: customTheme,
        };
      },

      render() {
        return React.createElement(Component, this.props);
      },
    });
  };
};
