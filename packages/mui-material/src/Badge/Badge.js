'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import usePreviousProps from '@mui/utils/usePreviousProps';
import composeClasses from '@mui/utils/composeClasses';
import useSlotProps from '@mui/utils/useSlotProps';
import useBadge from './useBadge';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import badgeClasses, { getBadgeUtilityClass } from './badgeClasses';

const RADIUS_STANDARD = 10;
const RADIUS_DOT = 4;

const useUtilityClasses = (ownerState) => {
  const { color, anchorOrigin, invisible, overlap, variant, classes = {} } = ownerState;

  const slots = {
    root: ['root'],
    badge: [
      'badge',
      variant,
      invisible && 'invisible',
      `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}`,
      `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(
        anchorOrigin.horizontal,
      )}${capitalize(overlap)}`,
      `overlap${capitalize(overlap)}`,
      color !== 'default' && `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getBadgeUtilityClass, classes);
};

const BadgeRoot = styled('span', {
  name: 'MuiBadge',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  position: 'relative',
  display: 'inline-flex',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  flexShrink: 0,
});

const BadgeBadge = styled('span', {
  name: 'MuiBadge',
  slot: 'Badge',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.badge,
      styles[ownerState.variant],
      styles[
        `anchorOrigin${capitalize(ownerState.anchorOrigin.vertical)}${capitalize(
          ownerState.anchorOrigin.horizontal,
        )}${capitalize(ownerState.overlap)}`
      ],
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
      ownerState.invisible && styles.invisible,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    boxSizing: 'border-box',
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(12),
    minWidth: RADIUS_STANDARD * 2,
    lineHeight: 1,
    padding: '0 6px',
    height: RADIUS_STANDARD * 2,
    borderRadius: RADIUS_STANDARD,
    zIndex: 1, // Render the badge on top of potential ripples.
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    variants: [
      ...Object.entries(theme.palette)
        .filter(([, palette]) => palette && palette.main && palette.contrastText)
        .map(([color]) => ({
          props: { color },
          style: {
            backgroundColor: (theme.vars || theme).palette[color].main,
            color: (theme.vars || theme).palette[color].contrastText,
          },
        })),
      {
        props: { variant: 'dot' },
        style: {
          borderRadius: RADIUS_DOT,
          height: RADIUS_DOT * 2,
          minWidth: RADIUS_DOT * 2,
          padding: 0,
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.anchorOrigin.vertical === 'top' &&
          ownerState.anchorOrigin.horizontal === 'right' &&
          ownerState.overlap === 'rectangular',
        style: {
          top: 0,
          right: 0,
          transform: 'scale(1) translate(50%, -50%)',
          transformOrigin: '100% 0%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(50%, -50%)',
          },
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.anchorOrigin.vertical === 'bottom' &&
          ownerState.anchorOrigin.horizontal === 'right' &&
          ownerState.overlap === 'rectangular',
        style: {
          bottom: 0,
          right: 0,
          transform: 'scale(1) translate(50%, 50%)',
          transformOrigin: '100% 100%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(50%, 50%)',
          },
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.anchorOrigin.vertical === 'top' &&
          ownerState.anchorOrigin.horizontal === 'left' &&
          ownerState.overlap === 'rectangular',
        style: {
          top: 0,
          left: 0,
          transform: 'scale(1) translate(-50%, -50%)',
          transformOrigin: '0% 0%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(-50%, -50%)',
          },
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.anchorOrigin.vertical === 'bottom' &&
          ownerState.anchorOrigin.horizontal === 'left' &&
          ownerState.overlap === 'rectangular',
        style: {
          bottom: 0,
          left: 0,
          transform: 'scale(1) translate(-50%, 50%)',
          transformOrigin: '0% 100%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(-50%, 50%)',
          },
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.anchorOrigin.vertical === 'top' &&
          ownerState.anchorOrigin.horizontal === 'right' &&
          ownerState.overlap === 'circular',
        style: {
          top: '14%',
          right: '14%',
          transform: 'scale(1) translate(50%, -50%)',
          transformOrigin: '100% 0%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(50%, -50%)',
          },
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.anchorOrigin.vertical === 'bottom' &&
          ownerState.anchorOrigin.horizontal === 'right' &&
          ownerState.overlap === 'circular',
        style: {
          bottom: '14%',
          right: '14%',
          transform: 'scale(1) translate(50%, 50%)',
          transformOrigin: '100% 100%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(50%, 50%)',
          },
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.anchorOrigin.vertical === 'top' &&
          ownerState.anchorOrigin.horizontal === 'left' &&
          ownerState.overlap === 'circular',
        style: {
          top: '14%',
          left: '14%',
          transform: 'scale(1) translate(-50%, -50%)',
          transformOrigin: '0% 0%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(-50%, -50%)',
          },
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.anchorOrigin.vertical === 'bottom' &&
          ownerState.anchorOrigin.horizontal === 'left' &&
          ownerState.overlap === 'circular',
        style: {
          bottom: '14%',
          left: '14%',
          transform: 'scale(1) translate(-50%, 50%)',
          transformOrigin: '0% 100%',
          [`&.${badgeClasses.invisible}`]: {
            transform: 'scale(0) translate(-50%, 50%)',
          },
        },
      },
      {
        props: { invisible: true },
        style: {
          transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.leavingScreen,
          }),
        },
      },
    ],
  })),
);

const Badge = React.forwardRef(function Badge(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiBadge' });
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: 'top',
      horizontal: 'right',
    },
    className,
    classes: classesProp,
    component,
    components = {},
    componentsProps = {},
    children,
    overlap: overlapProp = 'rectangular',
    color: colorProp = 'default',
    invisible: invisibleProp = false,
    max: maxProp = 99,
    badgeContent: badgeContentProp,
    slots,
    slotProps,
    showZero = false,
    variant: variantProp = 'standard',
    ...other
  } = props;

  const {
    badgeContent,
    invisible: invisibleFromHook,
    max,
    displayValue: displayValueFromHook,
  } = useBadge({
    max: maxProp,
    invisible: invisibleProp,
    badgeContent: badgeContentProp,
    showZero,
  });

  const prevProps = usePreviousProps({
    anchorOrigin: anchorOriginProp,
    color: colorProp,
    overlap: overlapProp,
    variant: variantProp,
    badgeContent: badgeContentProp,
  });

  const invisible = invisibleFromHook || (badgeContent == null && variantProp !== 'dot');

  const {
    color = colorProp,
    overlap = overlapProp,
    anchorOrigin = anchorOriginProp,
    variant = variantProp,
  } = invisible ? prevProps : props;

  const displayValue = variant !== 'dot' ? displayValueFromHook : undefined;

  const ownerState = {
    ...props,
    badgeContent,
    invisible,
    max,
    displayValue,
    showZero,
    anchorOrigin,
    color,
    overlap,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  // support both `slots` and `components` for backward compatibility
  const RootSlot = slots?.root ?? components.Root ?? BadgeRoot;
  const BadgeSlot = slots?.badge ?? components.Badge ?? BadgeBadge;

  const rootSlotProps = slotProps?.root ?? componentsProps.root;
  const badgeSlotProps = slotProps?.badge ?? componentsProps.badge;

  const rootProps = useSlotProps({
    elementType: RootSlot,
    externalSlotProps: rootSlotProps,
    externalForwardedProps: other,
    additionalProps: {
      ref,
      as: component,
    },
    ownerState,
    className: clsx(rootSlotProps?.className, classes.root, className),
  });

  const badgeProps = useSlotProps({
    elementType: BadgeSlot,
    externalSlotProps: badgeSlotProps,
    ownerState,
    className: clsx(classes.badge, badgeSlotProps?.className),
  });

  return (
    <RootSlot {...rootProps}>
      {children}
      <BadgeSlot {...badgeProps}>{displayValue}</BadgeSlot>
    </RootSlot>
  );
});

Badge.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components: PropTypes.shape({
    Badge: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps: PropTypes.shape({
    badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
   * The props used for each slot inside the Badge.
   * @default {}
   */
  slotProps: PropTypes.shape({
    badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    badge: PropTypes.elementType,
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
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['dot', 'standard']),
    PropTypes.string,
  ]),
};

export default Badge;
