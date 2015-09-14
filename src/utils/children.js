const React = require('react');
const createFragment = require('react-addons-create-fragment');

module.exports = {

  create(fragments) {
    let newFragments = {};
    let validChildrenCount = 0;
    let firstKey;

    //Only create non-empty key fragments
    for (let key in fragments) {
      const currentChild = fragments[key];

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

  extend(children, extendedProps, extendedChildren) {

    return React.isValidElement(children) ?
      React.Children.map(children, (child) => {

        const newProps = typeof(extendedProps) === 'function' ?
          extendedProps(child) : extendedProps;

        const newChildren = typeof(extendedChildren) === 'function' ?
          extendedChildren(child) : extendedChildren ?
          extendedChildren : child.props.children;

        return React.cloneElement(child, newProps, newChildren);
      }) : children;
  },

};
