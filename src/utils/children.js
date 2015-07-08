let React = require('react');

module.exports = {

  extend(children, extendedProps, extendedChildren) {

    return React.isValidElement(children) ?
      React.Children.map(children, (child) => {

        let newProps = typeof(extendedProps) === 'function' ?
          extendedProps(child) : extendedProps;

        let newChildren = typeof(extendedChildren) === 'function' ?
          extendedChildren(child) : extendedChildren ?
          extendedChildren : child.props.children;

        return React.cloneElement(child, newProps, newChildren);
      }) : children;
  },

};
