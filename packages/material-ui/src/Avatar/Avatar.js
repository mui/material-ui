import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(20),
    lineHeight: 1,
    borderRadius: '50%',
    overflow: 'hidden',
    userSelect: 'none',
  },
  /* Styles applied to the root element if there are children and not `src` or `srcSet`. */
  colorDefault: {
    color: theme.palette.background.default,
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600],
  },
  /* Styles applied to the root element if `variant="circle"`. */
  circle: {},
  /* Styles applied to the root element if `variant="rounded"`. */
  rounded: {
    borderRadius: theme.shape.borderRadius,
  },
  /* Styles applied to the root element if `variant="square"`. */
  square: {
    borderRadius: 0,
  },
  /* Styles applied to the img element if either `src` or `srcSet` is defined. */
  img: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    // Handle non-square image. The property isn't supported by IE 11.
    objectFit: 'cover',
  },
});

const Avatar = React.forwardRef(function Avatar(props, ref) {
  const {
    alt,
    children: childrenProp,
    classes,
    className,
    component: Component = 'div',
    imgProps,
    sizes,
    src,
    srcSet,
    variant = 'circle',
    ...other
  } = props;

  let children = null;
  const img = src || srcSet;

  if (img) {
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
  } else {
    children = childrenProp;
  }

  return (
    <Component
      className={clsx(
        classes.root,
        classes.system,
        classes[variant],
        {
          [classes.colorDefault]: !img,
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      {children}
    </Component>
  );
});

Avatar.propTypes = {
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: PropTypes.string,
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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
  component: PropTypes.elementType,
  /**
   * Attributes applied to the `img` element if the component
   * is used to display an image.
   */
  imgProps: PropTypes.object,
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
   * Use this attribute for responsive image display.
   */
  srcSet: PropTypes.string,
  /**
   * The shape of the avatar.
   */
  variant: PropTypes.oneOf(['circle', 'rounded', 'square']),
};

export default withStyles(styles, { name: 'MuiAvatar' })(Avatar);
