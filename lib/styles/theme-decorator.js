'use strict';

var React = require('react');

module.exports = function (customTheme) {

  return function (Component) {

    return React.createClass({

      childContextTypes: {
        muiTheme: React.PropTypes.object
      },

      getChildContext: function getChildContext() {
        return {
          muiTheme: customTheme
        };
      },

      render: function render() {
        return React.createElement(Component, this.props);
      }
    });
  };
};