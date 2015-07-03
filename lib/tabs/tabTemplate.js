'use strict';

var React = require('react');

var TabTemplate = React.createClass({
  displayName: 'TabTemplate',

  render: function render() {
    var styles = {
      'height': '0px',
      'overflow': 'hidden',
      'width': '100%',
      'position': 'relative',
      'textAlign': 'initial'
    };

    if (this.props.selected) {
      delete styles.height;
      delete styles.overflow;
    }

    return React.createElement(
      'div',
      { style: styles },
      this.props.children
    );
  }
});

module.exports = TabTemplate;