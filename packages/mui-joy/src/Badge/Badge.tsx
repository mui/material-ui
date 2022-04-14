import { unstable_composeClasses as composeClasses } from '@mui/base';
import BadgeUnstyled from '@mui/base/BadgeUnstyled';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize, usePreviousProps } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import shouldSpreadAdditionalProps from '../utils/shouldSpreadAdditionalProps';
import badgeClasses, { getBadgeUtilityClass } from './badgeClasses';
import { BadgeProps, BadgeTypeMap } from './BadgeProps';

const useUtilityClasses = (ownerState: BadgeProps) => {
  const { color, variant, size, anchorOrigin, overlap, invisible } = ownerState;

  const slots = {
    root: ['root'],
    badge: [
      'badge',
      invisible && 'invisible',
      anchorOrigin &&
        `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}`,
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
      overlap && `overlap${capitalize(overlap)}`,
    ],
  };

  return composeClasses(slots, getBadgeUtilityClass, {});
};

const BadgeRoot = styled('span', {
  name: 'MuiBadge',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: BadgeProps }>(() => ({
  position: 'relative',
  display: 'inline-flex',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  flexShrink: 0,
}));

const BadgeBadge = styled('span', {
  name: 'MuiBadge',
  slot: 'Badge',
  overridesResolver: (props, styles) => styles.badge,
})<{ ownerState: BadgeProps }>(({ theme, ownerState }) => {
  return [
    {
      ...(ownerState.size === 'sm' && {
        '--Badge-minHeight': '0.5rem',
        ...(ownerState.badgeContent && {
          '--Badge-minHeight': '1rem',
        }),
        '--Badge-paddingX': '0.25rem',
        fontSize: theme.vars.fontSize.xs,
      }),
      ...(ownerState.size === 'md' && {
        '--Badge-minHeight': '0.75rem',
        ...(ownerState.badgeContent && {
          '--Badge-minHeight': '1.25rem',
        }),
        '--Badge-paddingX': '0.375rem',
        fontSize: theme.vars.fontSize.sm,
      }),
      ...(ownerState.size === 'lg' && {
        '--Badge-minHeight': '1rem',
        ...(ownerState.badgeContent && {
          '--Badge-minHeight': '1.5rem',
        }),
        '--Badge-paddingX': '0.5rem',
        fontSize: theme.vars.fontSize.md,
      }),
      '--Badge-ringSize': '2px',
      '--Badge-ring': `0 0 0 var(--Badge-ringSize) var(--Badge-ringColor, ${theme.vars.palette.background.body})`,
      display: 'inline-flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      boxSizing: 'border-box',
      boxShadow: 'var(--Badge-ring)',
      fontFamily: theme.vars.fontFamily.body,
      fontWeight: theme.vars.fontWeight.md,
      lineHeight: 1,
      padding:
        'calc(var(--Badge-paddingX) / 2 - var(--variant-outlinedBorderWidth, 0px)) calc(var(--Badge-paddingX) - var(--variant-outlinedBorderWidth, 0px))',
      minHeight: 'var(--Badge-minHeight)',
      minWidth: 'var(--Badge-minHeight)',
      borderRadius: 'var(--Badge-minHeight)',
      zIndex: 1,
      transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      ...(ownerState.variant === 'outlined' && {
        backgroundColor: theme.vars.palette.background.body,
      }),
      ...(ownerState.anchorOrigin!.vertical === 'top' &&
        ownerState.anchorOrigin!.horizontal === 'right' &&
        ownerState.overlap === 'rectangular' && {
          top: 0,
          right: 0,
          transform: 'scale(1) translate(50%, -50%)',
          transformOrigin: '100% 0%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(50%, -50%)',
          },
        }),
      ...(ownerState.anchorOrigin!.vertical === 'bottom' &&
        ownerState.anchorOrigin!.horizontal === 'right' &&
        ownerState.overlap === 'rectangular' && {
          bottom: 0,
          right: 0,
          transform: 'scale(1) translate(50%, 50%)',
          transformOrigin: '100% 100%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(50%, 50%)',
          },
        }),
      ...(ownerState.anchorOrigin!.vertical === 'top' &&
        ownerState.anchorOrigin!.horizontal === 'left' &&
        ownerState.overlap === 'rectangular' && {
          top: 0,
          left: 0,
          transform: 'scale(1) translate(-50%, -50%)',
          transformOrigin: '0% 0%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(-50%, -50%)',
          },
        }),
      ...(ownerState.anchorOrigin!.vertical === 'bottom' &&
        ownerState.anchorOrigin!.horizontal === 'left' &&
        ownerState.overlap === 'rectangular' && {
          bottom: 0,
          left: 0,
          transform: 'scale(1) translate(-50%, 50%)',
          transformOrigin: '0% 100%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(-50%, 50%)',
          },
        }),
      ...(ownerState.anchorOrigin!.vertical === 'top' &&
        ownerState.anchorOrigin!.horizontal === 'right' &&
        ownerState.overlap === 'circular' && {
          top: '14%',
          right: '14%',
          transform: 'scale(1) translate(50%, -50%)',
          transformOrigin: '100% 0%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(50%, -50%)',
          },
        }),
      ...(ownerState.anchorOrigin!.vertical === 'bottom' &&
        ownerState.anchorOrigin!.horizontal === 'right' &&
        ownerState.overlap === 'circular' && {
          bottom: '14%',
          right: '14%',
          transform: 'scale(1) translate(50%, 50%)',
          transformOrigin: '100% 100%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(50%, 50%)',
          },
        }),
      ...(ownerState.anchorOrigin!.vertical === 'top' &&
        ownerState.anchorOrigin!.horizontal === 'left' &&
        ownerState.overlap === 'circular' && {
          top: '14%',
          left: '14%',
          transform: 'scale(1) translate(-50%, -50%)',
          transformOrigin: '0% 0%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(-50%, -50%)',
          },
        }),
      ...(ownerState.anchorOrigin!.vertical === 'bottom' &&
        ownerState.anchorOrigin!.horizontal === 'left' &&
        ownerState.overlap === 'circular' && {
          bottom: '14%',
          left: '14%',
          transform: 'scale(1) translate(-50%, 50%)',
          transformOrigin: '0% 100%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(-50%, 50%)',
          },
        }),
      ...(ownerState.invisible && {
        transition: 'transform 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      }),
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
  ];
});

const Badge = React.forwardRef(function Badge(inProps, ref) {
  const props = useThemeProps<typeof inProps & BadgeProps>({ props: inProps, name: 'MuiBadge' });
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: 'top',
      horizontal: 'right',
    },
    className,
    component = 'span',
    components = {},
    componentsProps = {},
    size: sizeProp = 'md',
    color: colorProp = 'primary',
    overlap: overlapProp = 'rectangular',
    invisible: invisibleProp = false,
    max,
    badgeContent: badgeContentProp = '',
    showZero = false,
    variant: variantProp = 'contained',
    ...other
  } = props;

  const prevProps = usePreviousProps({
    anchorOrigin: anchorOriginProp,
    size: sizeProp,
    overlap: overlapProp,
    color: colorProp,
    variant: variantProp,
  });

  let invisible = invisibleProp;

  if (
    invisibleProp === false &&
    ((badgeContentProp === 0 && !showZero) || badgeContentProp == null)
  ) {
    invisible = true;
  }

  const {
    color = colorProp,
    overlap = overlapProp,
    size = sizeProp,
    anchorOrigin = anchorOriginProp,
    variant = variantProp,
  }: {
    size?: BadgeTypeMap['props']['size'];
    overlap?: BadgeTypeMap['props']['overlap'];
    color?: BadgeTypeMap['props']['color'];
    anchorOrigin?: BadgeTypeMap['props']['anchorOrigin'];
    variant?: BadgeTypeMap['props']['variant'];
  } = invisible ? prevProps : props;

  const ownerState = { ...props, anchorOrigin, variant, invisible, color, size };
  const classes = useUtilityClasses(ownerState);
  const displayValue =
    max !== undefined && badgeContentProp && Number(badgeContentProp) > max
      ? `${max}+`
      : badgeContentProp;

  return (
    <BadgeUnstyled
      ref={ref}
      invisible={invisibleProp}
      badgeContent={displayValue}
      showZero={showZero}
      max={max}
      {...other}
      components={{
        Root: BadgeRoot,
        Badge: BadgeBadge,
        ...components,
      }}
      className={clsx(className, classes.root, componentsProps.root?.className)}
      componentsProps={{
        root: {
          ...componentsProps.root,
          ...(shouldSpreadAdditionalProps(components.Root) && {
            as: component,
            ownerState: {
              anchorOrigin,
              color,
              variant,
              overlap,
              size,
            },
          }),
        },
        badge: {
          ...componentsProps.badge,
          className: clsx(classes.badge, componentsProps.badge?.className),
          ...(shouldSpreadAdditionalProps(components.Badge) && {
            ownerState: {
              anchorOrigin,
              color,
              variant,
              overlap,
              size,
            },
          }),
        },
      }}
    />
  );
}) as OverridableComponent<BadgeTypeMap>;

Badge.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The anchor of the badge.
   * @default {
   *   vertical: 'top',
   *   horizontal: 'right',
   * }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'top']).isRequired,
  }),
  /**
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node,
  /**
   * The badge will be added relative to this node.
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
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Badge: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    badge: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible: PropTypes.bool,
  /**
   * Max count to show.
   * @default 99
   */
  max: PropTypes.number,
  /**
   * Wrapped shape the badge should overlap.
   * @default 'rectangular'
   */
  overlap: PropTypes.oneOf(['circular', 'rectangular']),
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The variant to use.
   * @default 'light'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default Badge;
