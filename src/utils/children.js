const React = require('react/addons');
const createFragment = React.addons.createFragment;

module.exports = {

  create() {
    let fragments = {};
    let validChildrenCount = 0;

    //loop through each argument and create the fragments
    for (let i = 0; i < arguments.length; i++) {
      const currentChild = arguments[i];
      if (currentChild) {
        fragments['_' + validChildrenCount] = currentChild;
        validChildrenCount++;
      }
    }

    if (validChildrenCount === 0) return undefined;
    if (validChildrenCount === 1) return fragments._0;
    return createFragment(fragments);
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
