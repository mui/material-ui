const React = require('react');

module.exports = (customTheme) => {

  return function(Component) {

    return React.createClass({

      childContextTypes : {
        muiTheme: React.PropTypes.object,
      },

      getChildContext () {
        return {
          muiTheme: customTheme,
        };
      },

      render() {
        return React.createElement(Component, this.props);
      },
    });

  };
}
