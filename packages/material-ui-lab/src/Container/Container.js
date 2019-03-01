import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils/helpers';

const styles = theme => ({
  root: {
    width: '100%',
    marginLeft: 'auto',
    boxSizing: 'border-box',
    marginRight: 'auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  fixed: Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
    const value = theme.breakpoints.values[breakpoint];

    if (value !== 0) {
      acc[theme.breakpoints.up(breakpoint)] = {
        maxWidth: value + theme.spacing(3) * 2,
      };
    }
    return acc;
  }, {}),
  maxWidthXs: {
    [theme.breakpoints.up('xs')]: {
      maxWidth: Math.max(theme.breakpoints.values.xs, 396) + theme.spacing(2) * 2,
    },
  },
  maxWidthSm: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.breakpoints.values.sm + theme.spacing(3) * 2,
    },
  },
  maxWidthMd: {
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.breakpoints.values.md + theme.spacing(3) * 2,
    },
  },
  maxWidthLg: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: theme.breakpoints.values.lg + theme.spacing(3) * 2,
    },
  },
  maxWidthXl: {
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.breakpoints.values.xl + theme.spacing(3) * 2,
    },
  },
});

function Container(props) {
  const { children, classes, className, component: Component, fixed, maxWidth, ...other } = props;

  return (
    <Component
      className={classNames(
        classes.root,
        classes[`maxWidth${capitalize(maxWidth)}`],
        {
          [classes.fixed]: fixed,
        },
        className,
      )}
      {...other}
    >
      {children}
    </Component>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
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
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   */
  fixed: PropTypes.bool,
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
};

Container.defaultProps = {
  component: 'div',
  fixed: false,
  maxWidth: 'lg',
};

export default withStyles(styles)(Container);
