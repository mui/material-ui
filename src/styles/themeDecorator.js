/* eslint-disable react/prefer-es6-class */
import React, {PropTypes} from 'react';
import warning from 'warning';

export default (customTheme) => {
  warning(false, `ThemeDecorator is deprecated, please use MuiThemeProvider instead.
    It will be removed with v0.16.0.`);

  return function(Component) {
    return React.createClass({
      childContextTypes: {
        muiTheme: PropTypes.object.isRequired,
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
