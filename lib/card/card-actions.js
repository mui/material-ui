'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var CardActions = React.createClass({
  displayName: 'CardActions',

  getStyles: function getStyles() {
    return {
      root: {
        padding: 8,
        position: 'relative'
      }
    };
  },

  propTypes: {
    expandable: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool
  },

  render: function render() {
    var styles = this.getStyles();

    var children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        style: { marginRight: 8 }
      });
    });

    return React.createElement(
      'div',
      _extends({}, this.props, { style: styles.root }),
      children
    );
  }
});

module.exports = CardActions;