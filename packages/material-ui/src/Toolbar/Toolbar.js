import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useThemeVariants } from '@material-ui/styles';
import withStyles from '../styles/withStyles';

export const styles = (theme) => ({
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
    className,
    component: Component = 'div',
    disableGutters = false,
    variant = 'regular',
    ...other
  } = props;

  const themeVariantsClasses = useThemeVariants(
    {
      ...props,
      component: Component,
      disableGutters,
      variant,
    },
    'MuiToolbar',
  );

  return (
    <Component
      className={clsx(
        classes.root,
        classes[variant],
        {
          [classes.gutters]: !disableGutters,
        },
        themeVariantsClasses,
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

Toolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
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
   * If `true`, disables gutter padding.
   */
  disableGutters: PropTypes.bool,
  /**
   * The variant to use.
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['dense', 'regular']),
    PropTypes.string,
  ]),
};

export default withStyles(styles, { name: 'MuiToolbar' })(Toolbar);
