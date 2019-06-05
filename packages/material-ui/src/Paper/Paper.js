import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import warning from 'warning';
import withStyles from '../styles/withStyles';

export const styles = theme => {
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
    ...elevations,
  };
};

const Paper = React.forwardRef(function Paper(props, ref) {
  const {
    classes,
    className: classNameProp,
    component: Component = 'div',
    square = false,
    elevation = 1,
    ...other
  } = props;

  warning(
    elevation >= 0 && elevation < 25,
    `Material-UI: this elevation \`${elevation}\` is not implemented.`,
  );

  const className = clsx(
    classes.root,
    classes[`elevation${elevation}`],
    {
      [classes.rounded]: !square,
    },
    classNameProp,
  );

  return <Component className={className} ref={ref} {...other} />;
});

Paper.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   */
  elevation: PropTypes.number,
  /**
   * If `true`, rounded corners are disabled.
   */
  square: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiPaper' })(Paper);
