import React from 'react';

export default (customTheme) => {

  return function(Component) {

    return React.createClass({

      childContextTypes: {
        _muiTheme: React.PropTypes.object,
      },

      getChildContext() {
        return {
          _muiTheme: customTheme,
        };
      },

      render() {
        return React.createElement(Component, this.props);
      },
    });

  };
};
