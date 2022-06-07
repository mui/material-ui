import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import Person from '../internal/svg-icons/Person';
import { getAvatarUtilityClass } from './avatarClasses';
import { AvatarProps, AvatarTypeMap } from './AvatarProps';
import { AvatarGroupContext } from '../AvatarGroup/AvatarGroup';

const useUtilityClasses = (ownerState: AvatarProps) => {
  const { size, variant, color, src, srcSet } = ownerState;

  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    img: [(src || srcSet) && 'img'],
    fallback: ['fallback'],
  };

  return composeClasses(slots, getAvatarUtilityClass, {});
};

const AvatarRoot = styled('div', {
  name: 'JoyAvatar',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AvatarProps }>(({ theme, ownerState }) => {
  return [
    {
      ...(ownerState.size === 'sm' && {
        width: `var(--Avatar-size, 2rem)`,
        height: `var(--Avatar-size, 2rem)`,
        fontSize: theme.vars.fontSize.sm,
      }),
      ...(ownerState.size === 'md' && {
        width: `var(--Avatar-size, 2.5rem)`,
        height: `var(--Avatar-size, 2.5rem)`,
        fontSize: theme.vars.fontSize.md,
      }),
      ...(ownerState.size === 'lg' && {
        width: `var(--Avatar-size, 3rem)`,
        height: `var(--Avatar-size, 3rem)`,
        fontSize: theme.vars.fontSize.lg,
      }),
      marginInlineStart: 'var(--Avatar-marginInlineStart)',
      boxShadow: `var(--Avatar-ring)`,
      fontFamily: theme.vars.fontFamily.body,
      fontWeight: theme.vars.fontWeight.md,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      lineHeight: 1,
      overflow: 'hidden',
      borderRadius: 'var(--Avatar-radius, 50%)',
      userSelect: 'none',
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
  ];
});

const AvatarImg = styled('img', {
  name: 'JoyAvatar',
  slot: 'Img',
  overridesResolver: (props, styles) => styles.img,
})<{ ownerState: AvatarProps }>({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  // Handle non-square image. The property isn't supported by IE11.
  objectFit: 'cover',
  // Hide alt text.
  color: 'transparent',
  // Hide the image broken icon, only works on Chrome.
  textIndent: 10000,
});

const AvatarFallback = styled(Person, {
  name: 'JoyAvatar',
  slot: 'Fallback',
  overridesResolver: (props, styles) => styles.fallback,
})<{ ownerState: AvatarProps }>({
  width: '64%',
  height: '64%',
});

type UseLoadedProps = { src?: string; srcSet?: string; crossOrigin?: any; referrerPolicy?: any };

function useLoaded({ crossOrigin, referrerPolicy, src, srcSet }: UseLoadedProps) {
  const [loaded, setLoaded] = React.useState<string | boolean>(false);

  React.useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }

    setLoaded(false);

    let active = true;
    const image = new Image();
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
    image.crossOrigin = crossOrigin;
    image.referrerPolicy = referrerPolicy;
    if (src) {
      image.src = src;
    }
    if (srcSet) {
      image.srcset = srcSet;
    }

    return () => {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);

  return loaded;
}

const Avatar = React.forwardRef(function Avatar(inProps, ref) {
  const props = useThemeProps<typeof inProps & AvatarProps>({
    props: inProps,
    name: 'JoyAvatar',
  });

  const groupContext = React.useContext(AvatarGroupContext);

  const {
    alt,
    className,
    color: colorProp = 'neutral',
    component = 'div',
    size: sizeProp = 'md',
    variant: variantProp = 'soft',
    imgProps,
    src,
    srcSet,
    children: childrenProp,
    ...other
  } = props;
  const color = inProps.color || groupContext?.color || colorProp;
  const variant = inProps.variant || groupContext?.variant || variantProp;
  const size = inProps.size || groupContext?.size || sizeProp;

  let children = null;

  // Use a hook instead of onError on the img element to support server-side rendering.
  const loaded = useLoaded({ ...imgProps, src, srcSet });
  const hasImg = src || srcSet;
  const hasImgNotFailing = hasImg && loaded !== 'error';

  const ownerState = {
    ...props,
    color,
    component,
    size,
    variant,
    grouped: !!groupContext,
  };

  const classes = useUtilityClasses(ownerState);

  if (hasImgNotFailing) {
    children = (
      <AvatarImg
        alt={alt}
        src={src}
        srcSet={srcSet}
        className={classes.img}
        ownerState={ownerState}
        {...imgProps}
      />
    );
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = <AvatarFallback className={classes.fallback} ownerState={ownerState} />;
  }

  return (
    <AvatarRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {children}
    </AvatarRoot>
  );
}) as OverridableComponent<AvatarTypeMap>;

Avatar.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
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
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   */
  imgProps: PropTypes.object,
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['lg', 'md', 'sm']),
    PropTypes.string,
  ]),
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Avatar;
