// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { emphasize } from '../styles/colorManipulator';

export const styleSheet = createStyleSheet('Avatar', (theme) => {
  const { palette } = theme;
  return {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      fontSize: 20,
      borderRadius: '50%',
      overflow: 'hidden',
      userSelect: 'none',
    },
    defaultColor: {
      color: palette.background.default,
      backgroundColor: emphasize(palette.background.default, 0.26),
    },
    img: {
      maxWidth: '100%',
      width: '100%',
      height: 'auto',
    },
  };
});

export default function Avatar(props, context) {
  const {
    alt,
    className: classNameProp,
    children: childrenProp,
    childrenClassName: childrenClassNameProp,
    component,
    sizes,
    src,
    srcSet,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
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
    const imgProps = {
      alt,
      src,
      srcSet,
      sizes,
      className: classes.img,
    };
    children = React.createElement('img', imgProps);
  }

  return React.createElement(component, containerProps, children);
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
   * Used by Chip to style the Avatar icon.
   */
  childrenClassName: PropTypes.string,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * The component type of the root element.
   */
  component: PropTypes.string,
  /**
   * sizes desc
   */
  sizes: PropTypes.string,
  /**
   * src desc
   */
  src: PropTypes.string,
  /**
   * srcSet desc
   */
  srcSet: PropTypes.string,
};

Avatar.defaultProps = {
  alt: '',
  component: 'div',
};

Avatar.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
