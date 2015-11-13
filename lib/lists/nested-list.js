'use strict';

var React = require('react');
var ImmutabilityHelper = require('../utils/immutability-helper');
var List = require('./list');

var NestedList = React.createClass({
  displayName: 'NestedList',

  propTypes: {
    nestedLevel: React.PropTypes.number,
    open: React.PropTypes.bool,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      nestedLevel: 1,
      open: false
    };
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var open = _props.open;
    var nestedLevel = _props.nestedLevel;
    var style = _props.style;

    var styles = {
      root: {
        display: open ? null : 'none'
      }
    };

    return React.createElement(
      List,
      { style: ImmutabilityHelper.merge(styles.root, style) },
      React.Children.map(children, function (child) {
        return React.isValidElement(child) ? React.cloneElement(child, {
          nestedLevel: nestedLevel + 1
        }) : child;
      })
    );
  }

});

module.exports = NestedList;