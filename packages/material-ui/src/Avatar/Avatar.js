import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styled from 'styled-components';
import themed from '../styles/themed';
import Person from '../internal/svg-icons/Person';

export const styles = {
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if not `src` or `srcSet`. */
  colorDefault: {},
  /* Styles applied to the root element if `variant="circle"`. */
  circle: {},
  /* Styles applied to the root element if `variant="rounded"`. */
  rounded: {},
  /* Styles applied to the root element if `variant="square"`. */
  square: {},
  /* Styles applied to the fallback icon */
  fallback: {},
};

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

const StyledComponent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.pxToRem(20)};
  line-height: 1;
  border-radius: ${({ theme, variant }) => {
    switch (variant) {
      case 'rounded':
        return `${theme.shape.borderRadius}px`;
      case 'square':
        return '0px';
      default:
        return '50%';
    }
  }};
  overflow: hidden;
  user-select: none;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  text-align: center;
  /* Handle non-square image. The property isn't supported by IE 11. */
  object-fit: cover;
  /* Hide alt text. */
  color: transparent;
  /* Hide the image broken icon, only works on Chrome. */
  text-indent: 10000px;
`;

const Fallback = styled(Person)`
  width: 75%;
  height: 75%;
`;

const Avatar = React.forwardRef(function Avatar(props, ref) {
  const {
    alt,
    children: childrenProp,
    classes = {},
    className,
    component = 'div',
    imgProps,
    sizes,
    src,
    srcSet,
    theme,
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
      <AvatarImage
        alt={alt}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        className={classes.img}
        theme={theme}
        {...imgProps}
      />
    );
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = <Fallback className={classes.fallback} theme={theme} />;
  }

  return (
    <StyledComponent
      as={component}
      className={clsx(
        classes.root,
        classes.system,
        classes[variant],
        {
          [classes.colorDefault]: !hasImgNotFailing,
        },
        className,
      )}
      hasImgNotFailing={hasImgNotFailing}
      ref={ref}
      theme={theme}
      {...other}
    >
      {children}
    </StyledComponent>
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
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
  theme: PropTypes.any.isRequired,
  /**
   * The shape of the avatar.
   */
  variant: PropTypes.oneOf(['circle', 'rounded', 'square']),
};

export default themed({ component: Avatar, name: 'MuiAvatar' });
