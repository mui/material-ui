import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  /* Styles applied to the root element if `disableGutters={false}`. */
  gutters: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  /* Styles applied to the root element if `variant="regular"`. */
  regular: theme.mixins.toolbar,
  /* Styles applied to the root element if `variant="dense"`. */
  dense: {
    minHeight: 48,
  },
});

const Toolbar = React.forwardRef(function Toolbar(props, ref) {
  const {
    classes,
    className: classNameProp,
    component: Component = 'div',
    disableGutters = false,
    variant = 'regular',
    ...other
  } = props;

  const className = clsx(
    classes.root,
    classes[variant],
    {
      [classes.gutters]: !disableGutters,
    },
    classNameProp,
  );

  return <Component className={className} ref={ref} {...other} />;
});

Toolbar.propTypes = {
  /**
   * Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
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
   * If `true`, disables gutter padding.
   */
  disableGutters: PropTypes.bool,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['regular', 'dense']),
};

export default withStyles(styles, { name: 'MuiToolbar' })(Toolbar);
