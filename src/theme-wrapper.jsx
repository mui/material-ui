import React from 'react';

export default React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    theme: React.PropTypes.object.isRequired,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.props.theme,
    };
  },

  render() {
    return this.props.children;
  },
});
