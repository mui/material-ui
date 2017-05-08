// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import ButtonBase from '../internal/ButtonBase';
import ArrowDownwardIcon from '../svg-icons/arrow-downward';

export const styleSheet = createStyleSheet('MuiTableSortLabel', (theme) => {
  return {
    sortLabel: {
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
  };
});

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
export default function TableSortLabel(props, context) {
  const { active, className, children, direction, ...other } = props;
  const classes = context.styleManager.render(styleSheet);
  const sortLabelClasses = classNames(classes.sortLabel, {
    [classes.active]: active,
  }, className);

  const iconClasses = classNames(classes.icon, {
    [classes[direction]]: !!direction,
  });

  return (
    <ButtonBase
      className={sortLabelClasses}
      component="span"
      ripple={false}
      {...other}
    >
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
   * The CSS class name of the root element.
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

TableSortLabel.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
