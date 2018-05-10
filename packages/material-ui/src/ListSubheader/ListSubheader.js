import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  root: theme.mixins.gutters({
    boxSizing: 'border-box',
    lineHeight: '48px',
    listStyle: 'none',
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(14),
  }),
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  colorInherit: {
    color: 'inherit',
  },
  inset: {
    paddingLeft: theme.spacing.unit * 9,
  },
  sticky: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: 'inherit',
  },
});

function ListSubheader(props) {
  const { classes, className, color, component: Component, disableSticky, inset, ...other } = props;

  return (
    <Component
      className={classNames(
        classes.root,
        {
          [classes[`color${capitalize(color)}`]]: color !== 'default',
          [classes.inset]: inset,
          [classes.sticky]: !disableSticky,
        },
        className,
      )}
      {...other}
    />
  );
}

ListSubheader.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['default', 'primary', 'inherit']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   */
  disableSticky: PropTypes.bool,
  /**
   * If `true`, the List Subheader will be indented.
   */
  inset: PropTypes.bool,
};

ListSubheader.defaultProps = {
  color: 'default',
  component: 'li',
  disableSticky: false,
  inset: false,
};

ListSubheader.muiName = 'ListSubheader';

export default withStyles(styles, { name: 'MuiListSubheader' })(ListSubheader);
