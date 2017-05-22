// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import { emphasize } from '../styles/colorManipulator';

export const styleSheet = createStyleSheet('MuiAvatar', (theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: 20,
    borderRadius: '50%',
    overflow: 'hidden',
    userSelect: 'none',
  },
  defaultColor: {
    color: theme.palette.background.default,
    backgroundColor: emphasize(theme.palette.background.default, 0.26),
  },
  img: {
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
  },
}));

function Avatar(props) {
  const {
    alt,
    classes,
    className: classNameProp,
    children: childrenProp,
    childrenClassName: childrenClassNameProp,
    component: ComponentProp,
    sizes,
    src,
    srcSet,
    ...other
  } = props;

  const className = classNames(classes.root, {
    [classes.defaultColor]: childrenProp && !src && !srcSet,
  }, classNameProp);
  const containerProps = {
    className,
    ...other,
  };

  let children = null;

  if (childrenProp) {
    if (childrenClassNameProp && React.isValidElement(childrenProp)) {
      const childrenClassName = classNames(childrenClassNameProp, childrenProp.props.className);
      children = React.cloneElement(childrenProp, { className: childrenClassName });
    } else {
      children = childrenProp;
    }
  } else if (src || srcSet) {
    children = React.createElement('img', {
      alt,
      src,
      srcSet,
      sizes,
      className: classes.img,
    });
  }

  return (
    <ComponentProp {...containerProps}>
      {children}
    </ComponentProp>
  );
}

Avatar.propTypes = {
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: PropTypes.string,
  /**
   * Used to render icon or text elements inside the Avatar.
   * `src` and `alt` props will not be used and no `img` will
   * be rendered by default.
   *
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   * The className of the child element.
   * Used by Chip and ListItemIcon to style the Avatar icon.
   */
  childrenClassName: PropTypes.string,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: PropTypes.string,
  /**
   * The `src` attribute for the `img` element.
   */
  src: PropTypes.string,
  /**
   * The `srcSet` attribute for the `img` element.
   */
  srcSet: PropTypes.string,
};

Avatar.defaultProps = {
  alt: '',
  component: 'div',
};

export default withStyles(styleSheet)(Avatar);
