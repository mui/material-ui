import * as React from 'react';
import PropTypes from 'prop-types';
import { usePreviousProps, unstable_capitalize as capitalize } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import useBadge from '@mui/base/useBadge';
import { useSlotProps } from '@mui/base';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import badgeClasses, { getBadgeUtilityClass } from './badgeClasses';
import { BadgeOwnerState, BadgeProps, BadgeTypeMap } from './Badge.types';
import { MD3ColorSchemeTokens } from '../styles';

const useUtilityClasses = (ownerState: BadgeOwnerState) => {
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
      `color${capitalize(color)}`,
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
})<{ ownerState: BadgeOwnerState }>(({ theme, ownerState }) => {
  const { vars: tokens } = theme;

  const letterSpacing = `${
    theme.sys.typescale.label.small.tracking / theme.sys.typescale.label.small.size
  }rem`;

  const verticalPositionProperty = ownerState.anchorOrigin.vertical === 'top' ? 'bottom' : 'top';
  const horizontalPositionProperty =
    ownerState.anchorOrigin.horizontal === 'left' ? 'right' : 'left';

  return {
    '--md-comp-badge-large-size': '16px',
    '--md-comp-badge-small-size': '6px',
    '--md-comp-badge-size': 'var(--md-comp-badge-large-size)',
    '--md-comp-badge-padding-x': '4px',
    '--md-comp-badge-inset': 'calc(var(--md-comp-badge-size) - 4px)',
    ...(ownerState.variant === 'small' && {
      '--md-comp-badge-size': 'var(--md-comp-badge-small-size)',
      '--md-comp-badge-inset': 'var(--md-comp-badge-size)',
      '--md-comp-badge-padding-x': '0px',
    }),
    ...(ownerState.overlap === 'circular' && {
      '--md-comp-badge-inset': 'calc(var(--md-comp-badge-size) / 2 + 14%)',
    }),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    boxSizing: 'border-box',
    fontFamily: tokens.sys.typescale.label.small.family,
    fontWeight: tokens.sys.typescale.label.small.weight,
    fontSize: theme.typography.pxToRem(theme.sys.typescale.label.small.size),
    lineHeight: `calc(${tokens.sys.typescale.label.small.lineHeight} / ${tokens.sys.typescale.label.small.size})`,
    letterSpacing,
    backgroundColor: tokens.sys.color[ownerState.color],
    color: tokens.sys.color[`on${capitalize(ownerState.color)}` as keyof MD3ColorSchemeTokens],
    minWidth: 'var(--md-comp-badge-size)',
    height: 'var(--md-comp-badge-size)',
    padding: '0 var(--md-comp-badge-padding-x)',
    borderRadius: tokens.sys.shape.corner.full,
    [verticalPositionProperty]: `calc(100% - var(--md-comp-badge-inset))`,
    [horizontalPositionProperty]: `calc(100% - var(--md-comp-badge-inset))`,
    transform: 'scale(1)',
    transformOrigin: 'calc(var(--md-comp-badge-size) / 2)',
    zIndex: 1, // Render the badge on top of potential ripples.
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [`&.${badgeClasses.invisible}`]: {
      transform: 'scale(0)',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  };
});

const Badge = React.forwardRef(function Badge<
  BaseComponentType extends React.ElementType = BadgeTypeMap['defaultComponent'],
>(inProps: BadgeProps<BaseComponentType>, ref: React.ForwardedRef<Element>) {
  const props = useThemeProps({ props: inProps, name: 'MuiBadge' });
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: 'top',
      horizontal: 'right',
    },
    className,
    classes: classesProp,
    component,
    children,
    overlap: overlapProp = 'rectangular',
    color: colorProp = 'error',
    invisible: invisibleProp = false,
    max: maxProp = 99,
    badgeContent: badgeContentProp,
    slots = {},
    slotProps = {},
    showZero = false,
    variant: variantProp = 'large',
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

  const invisible = invisibleFromHook || (badgeContent == null && variantProp !== 'small');

  const {
    color = colorProp,
    overlap = overlapProp,
    anchorOrigin = anchorOriginProp,
    variant = variantProp,
  } = invisible ? prevProps : props;

  const displayValue = variant !== 'small' ? displayValueFromHook : undefined;

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

  const RootSlot = slots.root ?? BadgeRoot;
  const BadgeSlot = slots.badge ?? BadgeBadge;

  const rootProps = useSlotProps({
    elementType: RootSlot,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
      as: component,
    },
    ownerState,
    className: [classes.root, className],
  });

  const badgeProps = useSlotProps({
    elementType: BadgeSlot,
    externalSlotProps: slotProps.badge,
    ownerState,
    className: classes.badge,
  });

  return (
    <RootSlot {...rootProps}>
      {children}
      <BadgeSlot {...badgeProps}>{displayValue}</BadgeSlot>
    </RootSlot>
  );
});

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
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'error'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
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
   * The variant to use.
   * @default 'large'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['dot', 'standard']),
    PropTypes.string,
  ]),
} as any;

export default Badge;
