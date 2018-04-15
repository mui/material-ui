// @inheritedComponent ButtonBase

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ArrowDownwardIcon from '../internal/svg-icons/ArrowDownward';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  root: {
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'inherit',
    alignItems: 'center',
    '&:hover': {
      color: theme.palette.text.primary,
    },
    '&:focus': {
      color: theme.palette.text.primary,
    },
  },
  active: {
    color: theme.palette.text.primary,
    '& $icon': {
      opacity: 1,
    },
  },
  icon: {
    height: 16,
    marginRight: 4,
    marginLeft: 4,
    opacity: 0,
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    userSelect: 'none',
    width: 16,
  },
  iconDirectionDesc: {
    transform: 'rotate(0deg)',
  },
  iconDirectionAsc: {
    transform: 'rotate(180deg)',
  },
});

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
function TableSortLabel(props) {
  const { active, classes, className, children, direction, ...other } = props;

  return (
    <ButtonBase
      className={classNames(classes.root, { [classes.active]: active }, className)}
      component="span"
      disableRipple
      {...other}
    >
      {children}
      <ArrowDownwardIcon
        className={classNames(classes.icon, classes[`iconDirection${capitalize(direction)}`])}
      />
    </ButtonBase>
  );
}

TableSortLabel.propTypes = {
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   */
  active: PropTypes.bool,
  /**
   * Label contents, the arrow will be appended automatically.
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
   * The current sort direction.
   */
  direction: PropTypes.oneOf(['asc', 'desc']),
};

TableSortLabel.defaultProps = {
  active: false,
  direction: 'desc',
};

export default withStyles(styles, { name: 'MuiTableSortLabel' })(TableSortLabel);
