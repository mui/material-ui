import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Person from '../internal/svg-icons/Person';

export const styles = (theme) => ({
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
  /* Styles applied to the root element if not `src` or `srcSet`. */
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
    // Hide alt text.
    color: 'transparent',
    // Hide the image broken icon, only works on Chrome.
    textIndent: 10000,
  },
  /* Styles applied to the fallback icon */
  fallback: {
    width: '75%',
    height: '75%',
  },
});

function useLoaded({ src, srcSet }) {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }

    setLoaded(false);

    let active = true;
    const image = new Image();
    image.src = src;
    image.srcSet = srcSet;
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded('loaded');
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded('error');
    };

    return () => {
      active = false;
    };
  }, [src, srcSet]);

  return loaded;
}

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

  // Use a hook instead of onError on the img element to support server-side rendering.
  const loaded = useLoaded({ src, srcSet });
  const hasImg = src || srcSet;
  const hasImgNotFailing = hasImg && loaded !== 'error';

  if (hasImgNotFailing) {
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
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = <Person className={classes.fallback} />;
  }

  return (
    <Component
      className={clsx(
        classes.root,
        classes.system,
        classes[variant],
        {
          [classes.colorDefault]: !hasImgNotFailing,
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
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * Attributes applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
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
