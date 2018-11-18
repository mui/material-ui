import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { chainPropTypes } from '@material-ui/utils';
import withStyles from './withStyles';

function omit(input, fields) {
  const output = {};

  Object.keys(input).forEach(prop => {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });

  return output;
}

const withPropsStyles = style => Component => {
  return props => {
    const StyledComponent = withStyles(theme => style(theme, props))(Component);
    return <StyledComponent {...props} />;
  };
};

function createBox(styleFunctions) {
  const stylesAdapter = (theme, props) => ({
    root: styleFunctions({ ...props, theme }),
  });

  const omittedProps = [
    'classes',
    'className',
    'component',
    'clone',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    ...(styleFunctions.filterProps || []),
  ];

  function Box(props) {
    const { children, classes, className: classNameProp, clone, component: Component } = props;
    const className = classNames(classes.root, classNameProp);
    const other = omit(props, omittedProps);

    if (clone) {
      return React.cloneElement(children, {
        className: classNames(children.props.className, className),
      });
    }

    if (typeof children === 'function') {
      return children({ className, ...other });
    }

    return <Component className={className} {...other} />;
  }

  Box.propTypes = {
    /**
     * Box render function or node.
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * If `true`, the box will recycle it's children DOM element.
     * It's using `React.cloneElement` internally.
     */
    clone: chainPropTypes(PropTypes.bool, props => {
      if (props.clone && props.component !== 'div') {
        throw new Error('You can not use the clone and component properties at the same time.');
      }
    }),
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
    ...styleFunctions.propTypes,
  };

  Box.defaultProps = {
    component: 'div',
    clone: false,
  };

  return withPropsStyles(stylesAdapter)(Box);
}

export default createBox;
