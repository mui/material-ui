// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import classNames from 'classnames';

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
      fontSize: 24,
      borderRadius: '50%',
      overflow: 'hidden',
    },
    defaultColor: {
      color: palette.getContrastText(palette.text.disabled),
      background: palette.text.disabled,
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
    component,
    icon,
    sizes,
    src,
    srcSet,
    ...other,
  } = props;

  const classes = context.styleManager.render(styleSheet, { group: 'mui' });
  const className = classNames(classes.root, {
    [classes.defaultColor]: icon && !src && !srcSet,
  }, classNameProp);

  const containerProps = {
    className,
    ...other,
  };

  let children = null;

  if (icon) {
    children = icon;
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
   * provide an alt attribute for the rendered `img` element
   */
  alt: PropTypes.string,
  className: PropTypes.string,
  component: PropTypes.string,
  /**
   * Supply a custom icon. `src` and `alt` props will
   * not be used and no `img` will be renderd by default.
   *
   * This can be a custom element, or even just a string.
   */
  icon: PropTypes.node,
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
