import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import { fade, useTheme } from '../styles';

// Inspired by https://github.com/material-components/material-components-ios/blob/bca36107405594d5b7b16265a5b0ed698f85a5ee/components/Elevation/src/UIColor%2BMaterialElevation.m#L61
function calculateAlpha(elevation) {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }

  return (alphaValue / 100).toFixed(2);
}

export const styles = (theme) => {
  const elevations = {};
  theme.shadows.forEach((shadow, index) => {
    elevations[`elevation${index}`] = {
      boxShadow: shadow,
    };
  });

  const overlays = {};
  theme.shadows.forEach((_, index) => {
    overlays[`overlay${index}`] = {
      '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: fade('#fff', calculateAlpha(index)),
      },
    };
  });

  return {
    /* Styles applied to the root element. */
    root: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      transition: theme.transitions.create('box-shadow'),
      position: 'relative',
    },
    /* Styles applied to the root element if `square={false}`. */
    rounded: {
      borderRadius: theme.shape.borderRadius,
    },
    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      border: `1px solid ${theme.palette.divider}`,
    },
    ...elevations,
    ...overlays,
  };
};

const Paper = React.forwardRef(function Paper(props, ref) {
  const {
    classes,
    className,
    component: Component = 'div',
    square = false,
    elevation = 1,
    variant = 'elevation',
    ...other
  } = props;

  const theme = useTheme();

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes.rounded]: !square,
          [classes[`elevation${elevation}`]]: variant === 'elevation',
          [classes[`overlay${elevation}`]]: theme.palette.type === 'dark',
          [classes.outlined]: variant === 'outlined',
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

Paper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
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
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   */
  elevation: chainPropTypes(PropTypes.number, (props) => {
    const { classes, elevation } = props;
    // in case `withStyles` fails to inject we don't need this warning
    if (classes === undefined) {
      return null;
    }
    if (elevation != null && classes[`elevation${elevation}`] === undefined) {
      return new Error(`Material-UI: This elevation \`${elevation}\` is not implemented.`);
    }
    return null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   */
  square: PropTypes.bool,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['elevation', 'outlined']),
};

export default withStyles(styles, { name: 'MuiPaper' })(Paper);
