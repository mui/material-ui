import { keyframes } from '@material-ui/styled-engine';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { deepmerge } from '@material-ui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { alpha, unstable_getUnit as getUnit, unstable_toUnitless as toUnitless } from '../styles';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getSkeletonUtilityClass } from './skeletonClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    ...styles[styleProps.variant],
    ...(styleProps.animation !== false && styles[styleProps.animation]),
    ...(styleProps.hasChildren && styles.withChildren),
    ...(styleProps.hasChildren && !styleProps.width && styles.fitContent),
    ...(styleProps.hasChildren && !styleProps.height && styles.heightAuto),
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes, variant, animation, hasChildren, width, height } = styleProps;

  const slots = {
    root: [
      'root',
      variant,
      animation,
      hasChildren && 'withChildren',
      hasChildren && !width && 'fitContent',
      hasChildren && !height && 'heightAuto',
    ],
  };

  return composeClasses(slots, getSkeletonUtilityClass, classes);
};

const pulseKeyframe = keyframes`
0% {
  opacity: 1;
}
50% {
  opacity: 0.4;
}
100% {
  opacity: 1;
}
`;

const waveKeyframe = keyframes`
0% {
  transform: translateX(-100%);
}
50% {
  /* +0.5s of delay between each loop */
  transform: translateX(100%);
}
100% {
  transform: translateX(100%);
}
`;

// This `styled()` function invokes keyframes. `styled-components` only supports keyframes
// in string templates. Do not convert these styles in JS object as it will break.
const SkeletonRoot = experimentalStyled(
  'span',
  {},
  { name: 'MuiSkeleton', slot: 'Root' },
  overridesResolver,
)`
  display: block;
  background-color: ${({ theme }) =>
    alpha(theme.palette.text.primary, theme.palette.mode === 'light' ? 0.11 : 0.13)};
  height: 1.2em;

  margin-top: ${({ styleProps }) => (styleProps.variant === 'text' ? 0 : undefined)};
  margin-bottom: ${({ styleProps }) => (styleProps.variant === 'text' ? 0 : undefined)};
  height: ${({ styleProps }) => (styleProps.variant === 'text' ? 'auto' : undefined)};
  transform-origin: ${({ styleProps }) => (styleProps.variant === 'text' ? '0 55%' : undefined)};
  transform: ${({ styleProps }) => (styleProps.variant === 'text' ? 'scale(1, 0.60)' : undefined)};
  border-radius: ${({ styleProps, theme }) => {
    if (styleProps.variant === 'text') {
      const radiusUnit = getUnit(theme.shape.borderRadius) || 'px';
      const radiusValue = toUnitless(theme.shape.borderRadius);
      return `${radiusValue}${radiusUnit}/${
        Math.round((radiusValue / 0.6) * 10) / 10
      }${radiusUnit}`;
    }
    return undefined;
  }};
  &:empty:before {
    content: ${({ styleProps }) => (styleProps.variant === 'text' ? '"\\00a0"' : undefined)};
  }


  border-radius: ${({ styleProps }) => (styleProps.variant === 'circular' ? '50%' : undefined)};

  animation-name: ${({ styleProps }) =>
    styleProps.animation === 'pulse' ? pulseKeyframe : undefined};
  animation-duration: ${({ styleProps }) =>
    styleProps.animation === 'pulse' ? '0.5s' : undefined};
  animation-timing-function: ${({ styleProps }) =>
    styleProps.animation === 'pulse' ? 'ease-in-out' : undefined};
  animation-delay: ${({ styleProps }) => (styleProps.animation === 'pulse' ? '1.5s' : undefined)};
  animation-iteration-count: ${({ styleProps }) =>
    styleProps.animation === 'pulse' ? 'infinite' : undefined};
  
  position: ${({ styleProps }) => (styleProps.animation === 'wave' ? 'relative' : undefined)};
  overflow: ${({ styleProps }) => (styleProps.animation === 'wave' ? 'hidden' : undefined)};
  -webkit-mask-image: ${({ styleProps }) =>
    styleProps.animation === 'wave' ? 'webkit-radial-gradient(white, black)' : undefined};
  &::after {
    animation-name: ${({ styleProps }) =>
      styleProps.animation === 'wave' ? waveKeyframe : undefined};
    animation-duration: ${({ styleProps }) =>
      styleProps.animation === 'wave' ? '1.6s' : undefined};
    animation-timing-function: ${({ styleProps }) =>
      styleProps.animation === 'wave' ? 'linear' : undefined};
    animation-delay: ${({ styleProps }) => (styleProps.animation === 'wave' ? '0.5s' : undefined)};
    animation-iteration-count: ${({ styleProps }) =>
      styleProps.animation === 'wave' ? 'infinite' : undefined};
    background: ${({ styleProps, theme }) =>
      styleProps.animation === 'wave'
        ? `linear-gradient(90deg, transparent, ${theme.palette.action.hover}, transparent)`
        : undefined};
    content: ${({ styleProps }) => (styleProps.animation === 'wave' ? '""' : undefined)};
    position: ${({ styleProps }) => (styleProps.animation === 'wave' ? 'absolute' : undefined)};
    transform: ${({ styleProps }) =>
      styleProps.animation === 'wave' ? 'translateX(-100%)' : undefined};
    bottom: ${({ styleProps }) => (styleProps.animation === 'wave' ? 0 : undefined)};
    left: ${({ styleProps }) => (styleProps.animation === 'wave' ? 0 : undefined)};
    right: ${({ styleProps }) => (styleProps.animation === 'wave' ? 0 : undefined)};
    top: ${({ styleProps }) => (styleProps.animation === 'wave' ? 0 : undefined)};
  }

  & > * {
    visibility: ${({ styleProps }) => (styleProps.hasChildren ? 'hidden' : undefined)};
  }

  max-width: ${({ styleProps }) =>
    styleProps.hasChildren && !styleProps.width ? 'fit-content' : undefined};

  height: ${({ styleProps }) =>
    styleProps.hasChildren && !styleProps.height ? 'auto' : undefined};
`;

const Skeleton = React.forwardRef(function Skeleton(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiSkeleton',
  });

  const {
    animation = 'pulse',
    className,
    component = 'span',
    height,
    style,
    variant = 'text',
    width,
    ...other
  } = props;

  const hasChildren = Boolean(other.children);

  const styleProps = {
    ...props,
    animation,
    component,
    variant,
    hasChildren,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <SkeletonRoot
      as={component}
      ref={ref}
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      {...other}
      style={{
        width,
        height,
        ...style,
      }}
    />
  );
});

Skeleton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The animation.
   * If `false` the animation effect is disabled.
   * @default 'pulse'
   */
  animation: PropTypes.oneOf(['pulse', 'wave', false]),
  /**
   * Optional children to infer width and height from.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
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
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The type of content that will be rendered.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['circular', 'rectangular', 'text']),
    PropTypes.string,
  ]),
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Skeleton;
