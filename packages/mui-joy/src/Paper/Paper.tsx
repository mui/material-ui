import { unstable_composeClasses as composeClasses } from '@mui/base';
import { alpha } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import clsx from 'clsx';
import { Mode } from 'packages/mui-system/src/cssVars/useCurrentColorScheme';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useColorScheme, useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getPaperUtilityClass } from './paperClasses';
import { PaperProps, PaperTypeMap } from './PaperProps';

// Originally from Material Paper
// Tweaked to be used for Joy Paper
const getOverlayAlpha = (elevationProp: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  const elevationMap = {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 25,
  };

  const elevation = elevationMap[elevationProp];
  let alphaValue;
  switch (elevationProp) {
    case 'xs':
      alphaValue = 4.5 * Math.log(elevation) + 2;
      break;
    case 'sm':
      alphaValue = 4.5 * Math.log(elevation) + 2;
      break;
    case 'md':
      alphaValue = 4.5 * Math.log(elevation) + 2;
      break;
    case 'lg':
      alphaValue = 4.5 * Math.log(elevation) + 2;
      break;
    case 'xl':
      alphaValue = 4.5 * Math.log(elevation) + 2;
      break;
    default:
      alphaValue = 4.5 * Math.log(elevation) + 2; // should be never reached
      break;
  }

  return Number((alphaValue / 100).toFixed(2));
};

const useUtilityClasses = (ownerState: PaperProps) => {
  const { elevation, variant, color, classes } = ownerState;

  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      elevation && `elevation${capitalize(elevation)}`,
    ],
  };

  return composeClasses(slots, getPaperUtilityClass, classes);
};

const PaperRoot = styled('div', {
  name: 'MuiPaper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      ownerState.variant === 'elevation' && styles[`elevation${ownerState.elevation}`],
    ];
  },
})<{ ownerState: PaperProps & { mode?: Mode } }>(({ theme, ownerState }) => {
  return [
    {
      // TODO: discuss the theme transition.
      // This value is copied from mui-material Paper.
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      ...(ownerState.elevation && {
        boxShadow: theme.shadow[ownerState.elevation],
        ...(ownerState.mode === 'dark' && {
          backgroundImage: `linear-gradient(${alpha(
            '#fff',
            getOverlayAlpha(ownerState.elevation),
          )}, ${alpha('#fff', getOverlayAlpha(ownerState.elevation))})`,
        }),
      }),
      ...(!ownerState.variant &&
        ownerState.color && {
          backgroundColor: theme.vars.palette[ownerState.color]?.textColor,
        }),
      borderRadius: theme.vars.radius.lg,
    },
    ownerState.variant && theme.variants[ownerState.variant]?.[ownerState.color!],
  ];
});

const Paper = React.forwardRef(function Paper(inProps, ref) {
  const props = useThemeProps<typeof inProps & PaperProps>({
    props: inProps,
    name: 'MuiPaper',
  });

  const { mode } = useColorScheme();
  const { className, color = 'neutral', component = 'div', variant, elevation, ...other } = props;

  const ownerState = {
    ...props,
    color,
    component,
    elevation,
    variant,
    mode,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <PaperRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    />
  );
}) as OverridableComponent<PaperTypeMap>;

Paper.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
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
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts theme values between 'xs' and 'xl'.
   */
  elevation: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
} as any;

export default Paper;
