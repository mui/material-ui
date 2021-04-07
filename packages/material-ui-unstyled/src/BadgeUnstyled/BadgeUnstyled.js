import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize, usePreviousProps } from '@material-ui/utils';
import isHostComponent from '../utils/isHostComponent';
import composeClasses from '../composeClasses';
import { getBadgeUtilityClass } from './badgeUnstyledClasses';

const useUtilityClasses = (styleProps) => {
  const { variant, anchorOrigin, overlap, invisible, classes } = styleProps;

  const slots = {
    root: ['root'],
    badge: [
      'badge',
      variant,
      `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(
        anchorOrigin.horizontal,
      )}${capitalize(overlap)}`,
      invisible && 'invisible',
    ],
  };

  return composeClasses(slots, getBadgeUtilityClass, classes);
};

const BadgeUnstyled = React.forwardRef(function BadgeUnstyled(props, ref) {
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: 'top',
      horizontal: 'right',
    },
    classes: classesProp,
    badgeContent: badgeContentProp,
    component = 'span',
    children,
    className,
    components = {},
    componentsProps = {},
    invisible: invisibleProp,
    max: maxProp = 99,
    overlap: overlapProp = 'rectangular',
    showZero = false,
    variant: variantProp = 'standard',
    /* eslint-disable react/prop-types */
    theme,
    ...other
  } = props;

  const prevProps = usePreviousProps({
    anchorOrigin: anchorOriginProp,
    badgeContent: badgeContentProp,
    max: maxProp,
    overlap: overlapProp,
    variant: variantProp,
  });

  let invisible = invisibleProp;

  if (
    invisibleProp == null &&
    ((badgeContentProp === 0 && !showZero) || (badgeContentProp == null && variantProp !== 'dot'))
  ) {
    invisible = true;
  }

  const {
    anchorOrigin = anchorOriginProp,
    badgeContent,
    max = maxProp,
    overlap = overlapProp,
    variant = variantProp,
  } = invisible ? prevProps : props;

  const styleProps = {
    ...props,
    anchorOrigin,
    badgeContent,
    classes: classesProp,
    invisible,
    max,
    overlap,
    variant,
  };

  let displayValue = '';

  if (variant !== 'dot') {
    displayValue = badgeContent > max ? `${max}+` : badgeContent;
  }

  const classes = useUtilityClasses(styleProps);

  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};

  const Badge = components.Badge || 'span';
  const badgeProps = componentsProps.badge || {};

  return (
    <Root
      {...rootProps}
      {...(!isHostComponent(Root) && {
        as: component,
        styleProps: { ...styleProps, ...rootProps.styleProps },
        theme,
      })}
      ref={ref}
      {...other}
      className={clsx(classes.root, rootProps.className, className)}
    >
      {children}
      <Badge
        {...badgeProps}
        {...(!isHostComponent(Badge) && {
          styleProps: { ...styleProps, ...badgeProps.styleProps },
          theme,
        })}
        className={clsx(classes.badge, badgeProps.className)}
      >
        {displayValue}
      </Badge>
    </Root>
  );
});

BadgeUnstyled.propTypes /* remove-proptypes */ = {
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
  componentsProps: PropTypes.object,
  /**
   * If `true`, the badge is invisible.
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
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes.string,
};

export default BadgeUnstyled;
