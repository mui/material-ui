import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    padding: 16,
    '&:last-child': {
      paddingBottom: 24,
    },
  },
};

const CardContent = React.forwardRef(function CardContent(props, ref) {
  const { classes, className, component: Component = 'div', ...other } = props;

  return <Component className={clsx(classes.root, className)} ref={ref} {...other} />;
});

CardContent.propTypes = {
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
};

export default withStyles(styles, { name: 'MuiCardContent' })(CardContent);
