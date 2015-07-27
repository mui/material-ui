'use strict';

var React = require('react');
var List = require('./list');

var ListNested = React.createClass({
  displayName: 'ListNested',

  propTypes: {
    nestedLevel: React.PropTypes.number,
    open: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      nestedLevel: 1,
      open: false
    };
  },

  render: function render() {
    var nestedLevel = this.props.nestedLevel;
    var style = {
      nestedList: {}
    };

    if (!this.props.open) {
      style.nestedList.display = 'none';
    }

    return React.createElement(
      List,
      { style: style.nestedList },
      React.Children.map(this.props.children, function (child) {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { nestedLevel: nestedLevel + 1 });
        }
        return child;
      })
    );
  }

});

module.exports = ListNested;