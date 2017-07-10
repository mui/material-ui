// @flow

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import { emphasize } from '../styles/colorManipulator';

export const styleSheet = createStyleSheet('MuiAvatar', theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: 20,
    borderRadius: '50%',
    overflow: 'hidden',
    userSelect: 'none',
  },
  colorDefault: {
    color: theme.palette.background.default,
    backgroundColor: emphasize(theme.palette.background.default, 0.26),
  },
  img: {
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
  },
}));

type DefaultProps = {
  alt: string,
  component: string,
};

type Props = DefaultProps & {
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt?: string,
  /**
   * Used to render icon or text elements inside the Avatar.
   * `src` and `alt` props will not be used and no `img` will
   * be rendered by default.
   *
   * This can be an element, or just a string.
   */
  children?: Element<*>,
  /**
   * @ignore
   * The className of the child element.
   * Used by Chip and ListItemIcon to style the Avatar icon.
   */
  childrenClassName?: string,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: string | Function,
  /**
   * Properties applied to the `img` element when the component
   * is used to display an image.
   */
  imgProps?: Object,
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes?: string,
  /**
   * The `src` attribute for the `img` element.
   */
  src?: string,
  /**
   * The `srcSet` attribute for the `img` element.
   */
  srcSet?: string,
};

function Avatar(props: Props) {
  const {
    alt,
    classes,
    className: classNameProp,
    children: childrenProp,
    childrenClassName: childrenClassNameProp,
    component: ComponentProp,
    imgProps,
    sizes,
    src,
    srcSet,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    {
      [classes.colorDefault]: childrenProp && !src && !srcSet,
    },
    classNameProp,
  );
  let children = null;

  if (childrenProp) {
    if (childrenClassNameProp && React.isValidElement(childrenProp)) {
      const childrenClassName = classNames(childrenClassNameProp, childrenProp.props.className);
      children = React.cloneElement(childrenProp, { className: childrenClassName });
    } else {
      children = childrenProp;
    }
  } else if (src || srcSet) {
    children = (
      <img
        alt={alt}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        className={classes.img}
        {...imgProps}
      />
    );
  }

  return (
    <ComponentProp className={className} {...other}>
      {children}
    </ComponentProp>
  );
}

Avatar.defaultProps = {
  alt: '',
  component: 'div',
};

export default withStyles(styleSheet)(Avatar);
