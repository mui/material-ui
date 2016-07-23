// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import ClassNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('TableSortLabel', (theme) => {
  return {
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
      '& active': {
        color: theme.palette.text.primary,
        icon: {
          opacity: 1,
        },
      },
    },
    icon: {
      fontSize: 16,
      marginRight: 4,
      marginLeft: 4,
      opacity: 0,
      transition: theme.transitions.create(['opacity', 'transform'], '200ms'),
      userSelect: 'none',
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
  const classes = context.styleManager.render(styleSheet, { group: 'mui' });
  const rootClasses = ClassNames(classes.root, {
    [classes.active]: active,
  }, className);
  const iconClasses = ClassNames(classes.icon, {
    [classes[direction]]: !!direction,
  }, 'material-icons');
  return (
    <ButtonBase
      className={rootClasses}
      component="span"
      ripple={false}
      {...other}
    >
      {children}
      <span className={iconClasses}>arrow_downward</span>
    </ButtonBase>
  );
}

TableSortLabel.propTypes = {
  /**
   * If set to true, will have the active styling (should be true for the sorted column)
   */
  active: PropTypes.bool,
  /**
   * Label contents, the arrow will be appended automatically and aligned using flexbox
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * The current sort direction
   */
  direction: PropTypes.oneOf(['asc', 'desc']),
};

TableSortLabel.defaultProps = {
  direction: 'desc',
};

TableSortLabel.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
