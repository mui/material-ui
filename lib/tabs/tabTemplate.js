'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');

var TabTemplate = React.createClass({
  displayName: 'TabTemplate',

  mixins: [StylePropable],

  propTypes: {
    selected: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object
  },

  render: function render() {
    var styles = this.mergeAndPrefix({
      'height': 0,
      'overflow': 'hidden',
      'width': '100%',
      'position': 'relative',
      'textAlign': 'initial'
    }, this.props.style);

    if (!this.props.selected) {
      styles.height = 0;
      styles.overflow = 'hidden';
    }

    return React.createElement(
      'div',
      { style: styles },
      this.props.children
    );
  }
});

module.exports = TabTemplate;