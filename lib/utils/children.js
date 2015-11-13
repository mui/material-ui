'use strict';

var React = require('react');
var createFragment = require('react-addons-create-fragment');

module.exports = {

  create: function create(fragments) {
    var newFragments = {};
    var validChildrenCount = 0;
    var firstKey = undefined;

    //Only create non-empty key fragments
    for (var key in fragments) {
      var currentChild = fragments[key];

      if (currentChild) {
        if (validChildrenCount === 0) firstKey = key;
        newFragments[key] = currentChild;
        validChildrenCount++;
      }
    }

    if (validChildrenCount === 0) return undefined;
    if (validChildrenCount === 1) return newFragments[firstKey];
    return createFragment(newFragments);
  },

  extend: function extend(children, extendedProps, extendedChildren) {

    return React.isValidElement(children) ? React.Children.map(children, function (child) {

      var newProps = typeof extendedProps === 'function' ? extendedProps(child) : extendedProps;

      var newChildren = typeof extendedChildren === 'function' ? extendedChildren(child) : extendedChildren ? extendedChildren : child.props.children;

      return React.cloneElement(child, newProps, newChildren);
    }) : children;
  }

};