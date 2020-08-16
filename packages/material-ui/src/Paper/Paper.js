import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import { useThemeVariants } from '@material-ui/styles';
import withStyles from '../styles/withStyles';

export const styles = (theme) => {
  const elevations = {};
  theme.shadows.forEach((shadow, index) => {
    elevations[`elevation${index}`] = {
      boxShadow: shadow,
    };
  });

  return {
    /* Styles applied to the root element. */
    root: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      transition: theme.transitions.create('box-shadow'),
    },
    /* Styles applied to the root element if `square={false}`. */
    rounded: {
      borderRadius: theme.shape.borderRadius,
    },
    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      border: `1px solid ${theme.palette.divider}`,
    },
    /* Styles applied to the root element if `variant="elevation"`. */
    elevation: {},
    ...elevations,
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

  const themeVariantsClasses = useThemeVariants(
    {
      ...props,
      component: Component,
      square,
      elevation,
      variant,
    },
    'MuiPaper',
  );

  return (
    <Component
      className={clsx(
        classes.root,
        classes[variant],
        {
          [classes.rounded]: !square,
          [classes[`elevation${elevation}`]]: variant === 'elevation',
        },
        themeVariantsClasses,
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
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['elevation', 'outlined']),
    PropTypes.string,
  ]),
};

export default withStyles(styles, { name: 'MuiPaper' })(Paper);
