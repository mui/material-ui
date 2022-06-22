import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { usePreviousProps } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import BadgeUnstyled from '@mui/base/BadgeUnstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import shouldSpreadAdditionalProps from '../utils/shouldSpreadAdditionalProps';
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
})(({ theme, ownerState }) => ({
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
  ...(ownerState.color !== 'default' && {
    backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
    color: (theme.vars || theme).palette[ownerState.color].contrastText,
  }),
  ...(ownerState.variant === 'dot' && {
    borderRadius: RADIUS_DOT,
    height: RADIUS_DOT * 2,
    minWidth: RADIUS_DOT * 2,
    padding: 0,
  }),
  ...(ownerState.anchorOrigin.vertical === 'top' &&
    ownerState.anchorOrigin.horizontal === 'right' &&
    ownerState.overlap === 'rectangular' && {
      top: 0,
      right: 0,
      transform: 'scale(1) translate(50%, -50%)',
      transformOrigin: '100% 0%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(50%, -50%)',
      },
    }),
  ...(ownerState.anchorOrigin.vertical === 'bottom' &&
    ownerState.anchorOrigin.horizontal === 'right' &&
    ownerState.overlap === 'rectangular' && {
      bottom: 0,
      right: 0,
      transform: 'scale(1) translate(50%, 50%)',
      transformOrigin: '100% 100%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(50%, 50%)',
      },
    }),
  ...(ownerState.anchorOrigin.vertical === 'top' &&
    ownerState.anchorOrigin.horizontal === 'left' &&
    ownerState.overlap === 'rectangular' && {
      top: 0,
      left: 0,
      transform: 'scale(1) translate(-50%, -50%)',
      transformOrigin: '0% 0%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(-50%, -50%)',
      },
    }),
  ...(ownerState.anchorOrigin.vertical === 'bottom' &&
    ownerState.anchorOrigin.horizontal === 'left' &&
    ownerState.overlap === 'rectangular' && {
      bottom: 0,
      left: 0,
      transform: 'scale(1) translate(-50%, 50%)',
      transformOrigin: '0% 100%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(-50%, 50%)',
      },
    }),
  ...(ownerState.anchorOrigin.vertical === 'top' &&
    ownerState.anchorOrigin.horizontal === 'right' &&
    ownerState.overlap === 'circular' && {
      top: '14%',
      right: '14%',
      transform: 'scale(1) translate(50%, -50%)',
      transformOrigin: '100% 0%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(50%, -50%)',
      },
    }),
  ...(ownerState.anchorOrigin.vertical === 'bottom' &&
    ownerState.anchorOrigin.horizontal === 'right' &&
    ownerState.overlap === 'circular' && {
      bottom: '14%',
      right: '14%',
      transform: 'scale(1) translate(50%, 50%)',
      transformOrigin: '100% 100%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(50%, 50%)',
      },
    }),
  ...(ownerState.anchorOrigin.vertical === 'top' &&
    ownerState.anchorOrigin.horizontal === 'left' &&
    ownerState.overlap === 'circular' && {
      top: '14%',
      left: '14%',
      transform: 'scale(1) translate(-50%, -50%)',
      transformOrigin: '0% 0%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(-50%, -50%)',
      },
    }),
  ...(ownerState.anchorOrigin.vertical === 'bottom' &&
    ownerState.anchorOrigin.horizontal === 'left' &&
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
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

const Badge = React.forwardRef(function Badge(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiBadge' });
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: 'top',
      horizontal: 'right',
    },
    className,
    component = 'span',
    components = {},
    componentsProps = {},
    overlap: overlapProp = 'rectangular',
    color: colorProp = 'default',
    invisible: invisibleProp = false,
    max,
    badgeContent: badgeContentProp,
    showZero = false,
    variant: variantProp = 'standard',
    ...other
  } = props;

  const prevProps = usePreviousProps({
    anchorOrigin: anchorOriginProp,
    color: colorProp,
    overlap: overlapProp,
    variant: variantProp,
  });

  let invisible = invisibleProp;

  if (
    invisibleProp === false &&
    ((badgeContentProp === 0 && !showZero) || (badgeContentProp == null && variantProp !== 'dot'))
  ) {
    invisible = true;
  }

  const {
    color = colorProp,
    overlap = overlapProp,
    anchorOrigin = anchorOriginProp,
    variant = variantProp,
  } = invisible ? prevProps : props;

  const ownerState = { ...props, anchorOrigin, invisible, color, overlap, variant };
  const classes = useUtilityClasses(ownerState);

  let displayValue;

  if (variant !== 'dot') {
    displayValue =
      badgeContentProp && Number(badgeContentProp) > max ? `${max}+` : badgeContentProp;
  }

  return (
    <BadgeUnstyled
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
              ...componentsProps.root?.ownerState,
              anchorOrigin,
              color,
              overlap,
              variant,
            },
          }),
        },
        badge: {
          ...componentsProps.badge,
          className: clsx(classes.badge, componentsProps.badge?.className),
          ...(shouldSpreadAdditionalProps(components.Badge) && {
            ownerState: {
              ...componentsProps.badge?.ownerState,
              anchorOrigin,
              color,
              overlap,
              variant,
            },
          }),
        },
      }}
      ref={ref}
    />
  );
});

Badge.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
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
