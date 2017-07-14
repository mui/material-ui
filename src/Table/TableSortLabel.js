// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import ButtonBase from '../internal/ButtonBase';
import ArrowDownwardIcon from '../svg-icons/arrow-downward';

export const styleSheet = createStyleSheet('MuiTableSortLabel', theme => ({
  root: {
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'inherit',
    alignItems: 'center',
    background: 'transparent',
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
  desc: {
    transform: 'rotate(0deg)',
  },
  asc: {
    transform: 'rotate(180deg)',
  },
}));

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
function TableSortLabel(props) {
  const { active, classes, className: classNameProp, children, direction, ...other } = props;
  const className = classNames(
    classes.root,
    {
      [classes.active]: active,
    },
    classNameProp,
  );

  const iconClasses = classNames(classes.icon, {
    [classes[direction]]: !!direction,
  });

  return (
    <ButtonBase className={className} component="span" disableRipple {...other}>
      {children}
      <ArrowDownwardIcon className={iconClasses} />
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

export default withStyles(styleSheet)(TableSortLabel);
