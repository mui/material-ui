'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { keyframes, css } from '@mui/system';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps, Components, TypographySystem } from '../styles';
import styled from '../styles/styled';
import { getSkeletonUtilityClass } from './skeletonClasses';
import { SkeletonOwnerState, SkeletonProps, SkeletonTypeMap } from './SkeletonProps';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: SkeletonOwnerState) => {
  const { variant, level } = ownerState;

  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      level && `level${capitalize(level)}`,
    ],
  };

  return composeClasses(slots, getSkeletonUtilityClass, {});
};

// Add solid background for masking the component that has the same background.
// Otherwise, the pulse animation will not work properly.
const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
    background: var(--unstable_pulse-bg);
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

const SkeletonRoot = styled('span', {
  name: 'JoySkeleton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SkeletonOwnerState }>(
  /**
   * Animations
   */
  ({ ownerState, theme }) =>
    ownerState.animation === 'pulse' &&
    ownerState.variant !== 'inline' &&
    css`
      &::before {
        animation: ${pulseKeyframe} 2s ease-in-out 0.5s infinite;
        background: ${theme.vars.palette.background.level3};
      }
    `,
  ({ ownerState, theme }) =>
    ownerState.animation === 'pulse' &&
    ownerState.variant === 'inline' &&
    css`
      &::after {
        animation: ${pulseKeyframe} 2s ease-in-out 0.5s infinite;
        background: ${theme.vars.palette.background.level3};
      }
    `,
  ({ ownerState, theme }) =>
    ownerState.animation === 'wave' &&
    css`
      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);
      background: ${theme.vars.palette.background.level3};

      &::after {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: var(--unstable_pseudo-zIndex);
        animation: ${waveKeyframe} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          var(--unstable_wave-bg, rgba(0 0 0 / 0.08)),
          transparent
        );
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
      }
    `,
  /**
   * Implementation notes:
   * 1. The `Skeleton` has 3 parts:
   *  - the root (span) element as a container
   *  - the ::before pseudo-element for covering the content
   *  - the ::after pseudo-element for animation on top of the ::before pseudo-element
   *
   * 2. The root element and ::before will change to absolute position when shape="overlay" to cover the parent's content.
   *
   * 3. For geometry shape (rectangular, circular), the typography styles are applied to the root element so that width, height can be customized based on the font-size.
   */
  ({ ownerState, theme }) => {
    const defaultLevel = ((theme as { components?: Components<typeof theme> }).components
      ?.JoyTypography?.defaultProps?.level || 'body1') as keyof TypographySystem;
    return [
      {
        display: 'block',
        position: 'relative',
        '--unstable_pseudo-zIndex': 9,
        '--unstable_pulse-bg': theme.vars.palette.background.level1,
        overflow: 'hidden',
        cursor: 'default',
        color: 'transparent',
        '& *': {
          visibility: 'hidden',
        },
        '&::before': {
          display: 'block',
          content: '" "',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--unstable_pseudo-zIndex)',
          borderRadius: 'inherit',
        },
        [theme.getColorSchemeSelector('dark')]: {
          '--unstable_wave-bg': 'rgba(255 255 255 / 0.1)',
        },
      } as const,
      ownerState.variant === 'rectangular' &&
        ({
          borderRadius: 'min(0.15em, 6px)',
          height: 'auto',
          width: '100%',
          '&::before': {
            position: 'absolute',
          },
          ...(!ownerState.animation && {
            backgroundColor: theme.vars.palette.background.level3,
          }),
          ...(ownerState.level !== 'inherit' && {
            ...theme.typography[ownerState.level!],
          }),
        } as const),
      ownerState.variant === 'circular' &&
        ({
          borderRadius: '50%',
          width: '100%',
          height: '100%',
          '&::before': {
            position: 'absolute',
          },
          ...(!ownerState.animation && {
            backgroundColor: theme.vars.palette.background.level3,
          }),
          ...(ownerState.level !== 'inherit' && {
            ...theme.typography[ownerState.level!],
          }),
        } as const),
      ownerState.variant === 'text' &&
        ({
          borderRadius: 'min(0.15em, 6px)',
          background: 'transparent',
          width: '100%',
          ...(ownerState.level !== 'inherit' && {
            ...theme.typography[ownerState.level || defaultLevel],
            paddingBlockStart: `calc((${
              theme.typography[ownerState.level || defaultLevel]?.lineHeight || 1
            } - 1) * 0.56em)`,
            paddingBlockEnd: `calc((${
              theme.typography[ownerState.level || defaultLevel]?.lineHeight || 1
            } - 1) * 0.44em)`,
            '&::before': {
              height: '1em',
              ...theme.typography[ownerState.level || defaultLevel],
              ...(ownerState.animation === 'wave' && {
                backgroundColor: theme.vars.palette.background.level3,
              }),
              ...(!ownerState.animation && {
                backgroundColor: theme.vars.palette.background.level3,
              }),
            },
            '&::after': {
              height: '1em',
              top: `calc((${
                theme.typography[ownerState.level || defaultLevel]?.lineHeight || 1
              } - 1) * 0.56em)`,
              ...theme.typography[ownerState.level || defaultLevel],
            },
          }),
        } as const),
      ownerState.variant === 'inline' &&
        ({
          display: 'inline',
          position: 'initial',
          borderRadius: 'min(0.15em, 6px)',
          ...(!ownerState.animation && {
            backgroundColor: theme.vars.palette.background.level3,
          }),
          ...(ownerState.level !== 'inherit' && {
            ...theme.typography[ownerState.level!],
          }),
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          '&::before': {
            position: 'absolute',
            zIndex: 'var(--unstable_pseudo-zIndex)',
            backgroundColor: theme.vars.palette.background.level3,
          },
          ...(ownerState.animation === 'pulse' && {
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 'var(--unstable_pseudo-zIndex)',
              backgroundColor: theme.vars.palette.background.level3,
            },
          }),
        } as const),
      ownerState.variant === 'overlay' &&
        ({
          borderRadius: theme.vars.radius.xs,
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 'var(--unstable_pseudo-zIndex)',
          ...(ownerState.animation === 'pulse' && {
            backgroundColor: theme.vars.palette.background.surface,
          }),
          ...(ownerState.level !== 'inherit' && {
            ...theme.typography[ownerState.level!],
          }),
          '&::before': {
            position: 'absolute',
          },
        } as const),
    ];
  },
);
/**
 *
 * Demos:
 *
 * - [Skeleton](https://mui.com/joy-ui/react-skeleton/)
 *
 * API:
 *
 * - [Skeleton API](https://mui.com/joy-ui/api/skeleton/)
 */
const Skeleton = React.forwardRef(function Skeleton(inProps, ref) {
  const props = useThemeProps<typeof inProps & SkeletonProps>({
    props: inProps,
    name: 'JoySkeleton',
  });

  const {
    className,
    component = 'span',
    children,
    animation = 'pulse',
    overlay = false,
    loading = true,
    variant = 'overlay',
    level = variant === 'text' ? 'body-md' : 'inherit',
    height,
    width,
    sx,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const externalForwardedProps = {
    ...other,
    component,
    slots,
    slotProps,
    sx: [{ width, height }, ...(Array.isArray(sx) ? sx : [sx])],
  };

  const ownerState = {
    ...props,
    animation,
    component,
    level,
    loading,
    overlay,
    variant,
    width,
    height,
  };

  const classes = useUtilityClasses(ownerState);

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: SkeletonRoot,
    externalForwardedProps,
    ownerState,
  });

  return loading ? (
    <SlotRoot {...rootProps}>{children}</SlotRoot>
  ) : (
    <React.Fragment>
      {React.Children.map(children, (child, index) =>
        index === 0 && React.isValidElement(child)
          ? React.cloneElement(child, { 'data-first-child': '' } as Record<string, string>)
          : child,
      )}
    </React.Fragment>
  );
}) as OverridableComponent<SkeletonTypeMap>;

Skeleton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The animation.
   * If `false` the animation effect is disabled.
   * @default 'pulse'
   */
  animation: PropTypes.oneOf(['pulse', 'wave', false]),
  /**
   * Used to render icon or text elements inside the Skeleton if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
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
  height: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.shape({
      lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    PropTypes.string,
  ]),
  /**
   * Applies the theme typography styles.
   * @default variant === 'text' ? 'body-md' : 'inherit'
   */
  level: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'h1',
      'h2',
      'h3',
      'h4',
      'title-lg',
      'title-md',
      'title-sm',
      'body-lg',
      'body-md',
      'body-sm',
      'body-xs',
      'inherit',
    ]),
    PropTypes.string,
  ]),
  /**
   * If `true`, the skeleton appears.
   * @default true
   */
  loading: PropTypes.bool,
  /**
   * If `true`, the skeleton's position will change to `absolute` to fill the available space of the nearest parent.
   * This prop is useful to create a placeholder that has the element's dimensions.
   * @default false
   */
  overlay: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The type of content that will be rendered.
   * @default 'overlay'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['circular', 'inline', 'overlay', 'rectangular', 'text']),
    PropTypes.string,
  ]),
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.shape({
      lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    PropTypes.string,
  ]),
} as any;

// @ts-ignore internal usage only with Typography and Link
Skeleton.muiName = 'Skeleton';

export default Skeleton;
