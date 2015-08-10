'use strict';

var React = require('react');

module.exports = {

  extend: function extend(children, extendedProps, extendedChildren) {

    return React.isValidElement(children) ? React.Children.map(children, function (child) {

      var newProps = typeof extendedProps === 'function' ? extendedProps(child) : extendedProps;

      var newChildren = typeof extendedChildren === 'function' ? extendedChildren(child) : extendedChildren ? extendedChildren : child.props.children;

      return React.cloneElement(child, newProps, newChildren);
    }) : children;
  }

};